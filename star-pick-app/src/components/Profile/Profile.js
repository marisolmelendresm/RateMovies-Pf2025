import { Navigate } from 'react-router-dom';
import MovieCatalog from '../MovieCatalog/MovieCatalog';
import './Profile.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getWatchedCountReq } from '../../api/movies';

function Profile() {
    const [watched, setWatched] = useState(0);
    const { token, user } = useAuth();

    useEffect(() => {
        const getWatchedCount = async () => {
            if (!token) return;

            try {
                const result = await getWatchedCountReq({ token: token });
                setWatched(result.count);
            } catch(err) {
                console.error("Failed to fetch watched count");
            }
        }
        getWatchedCount();
    }, [token]);

    return (
            <div>
                { token ? 
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
                                <MovieCatalog categoryName="favorites"/>
                                <MovieCatalog categoryName="watch-again"/>
                        </div>
                    ) : (
                        <Navigate to="/login" replace />
                    )
                    : null
                }
            </div>
    );
}

export default Profile;