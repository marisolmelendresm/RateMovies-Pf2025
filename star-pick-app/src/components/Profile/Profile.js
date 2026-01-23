import { Navigate } from 'react-router-dom';
import MovieCatalog from '../MovieCatalog/MovieCatalog';
import './Profile.css';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';

function Profile({ authChecked }) {
    const [favorites, setFavorites] = useState([]);
    const [watched, setWatched] = useState(0);
    const { user } = useUser();

    useEffect(() => {
        const getWatchedCount = async () => {
            if (!user) return;

            try {
                const response = await fetch(`http://localhost:3001/watchedCount/${user.id}`);

                const result = await response.json();

                if (!response.ok) {
                    console.error(result.message);
                    return;
                }
                
                setWatched(result.count);
            } catch(err) {
                console.error("Failed to fetch watched count");
            }
        }

        getWatchedCount();
    }, [user]);

    return (
            <div>
                {authChecked ? (
                    user ? (
                        <div>
                            <div className="greetingContainer">
                                <h2 className="greeting">Hey,</h2> 
                                <h2 className="name">{user.fullName}</h2>
                            </div>
                            <div className="watchCountContainer">
                                <p className="watchText">You've watched</p>
                                <p className="watchCount">{watched}</p>
                                <p className="watchText">movies this year</p>
                            </div>
                            <div className="movieCatalogContainer">
                                <MovieCatalog categoryName="watch-again" list={favorites}/>
                                <MovieCatalog categoryName="Avengers"/>
                            </div>
                        </div>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                    ) : (
                        null
                    )
                }
                
            </div>
    );
}

export default Profile;