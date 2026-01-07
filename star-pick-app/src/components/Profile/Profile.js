import MovieCatalog from '../MovieCatalog/MovieCatalog';
import './Profile.css';
import { useState } from 'react';

function Profile() {
    const [watchCount, setWatchCount] = useState(0);
    const [favorites, setFavorites] = useState([]);

    return (
        <div>
            <div className="greetingContainer">
                <h2 className="greeting">Hey,</h2> 
                <h2 className="name">Marisol Melendres</h2>
            </div>
            <div className="watchCountContainer">
                <p className="watchText">You've watched</p>
                <p className="watchCount">{watchCount}</p>
                <p className="watchText">movies this year</p>
            </div>
            <div className="movieCatalogContainer">
                <MovieCatalog categoryName="Rocky" list={favorites} />
                <MovieCatalog categoryName="Avengers" />
            </div>

        </div>
    );
}

export default Profile;