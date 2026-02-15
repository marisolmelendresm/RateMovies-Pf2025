import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MovieCatalog from '../MovieCatalog/MovieCatalog';
import ReviewList from '../ReviewList/ReviewList';

import './Profile.css';
import { useAuth } from '../../context/AuthContext';
import { getWatchedCountReq } from '../../api/movies';

function Profile() {
    const [watched, setWatched] = useState(0);
    const { token, user, authChecked, logout } = useAuth();
    const [tab, setTab] = useState("reviews");

    const changeTab = (newTab) => {
        if (newTab != tab) {
            setTab(newTab);
        }
    }

    useEffect(() => {
        const getWatchedCount = async () => {
            if (!token) return;

            try {
                const result = await getWatchedCountReq({ token: token }, logout);
                setWatched(result.count);
            } catch(err) {
                console.error("Failed to fetch watched count");
            }
        }
        getWatchedCount();
    }, [token]);

    return (
            <div>
                { authChecked ? 
                    token ? 
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
                                <div className="profileTabs">
                                    <div className={`reviewsTab tab ${tab === "reviews" ? 'active' : ''}`} onClick={() => changeTab("reviews")}>Reviews</div>
                                    <div className={`yourPicksTab tab ${tab === "picks" ? 'active' : ''}`} onClick={() => changeTab("picks")}>Your Picks</div>
                                </div>
                                { tab === "picks" ? 
                                    (<div>
                                        <MovieCatalog categoryName="favorites"/>
                                        <MovieCatalog categoryName="watch-again"/>
                                    </div>)
                                    :
                                    (
                                        <ReviewList></ReviewList>
                                    )

                                }
                            </div>
                        ) : (
                            <Navigate to="/login" replace />
                    ) :
                    <Navigate to="/login" replace />
                    : null
                }
            </div>
    );
}

export default Profile;