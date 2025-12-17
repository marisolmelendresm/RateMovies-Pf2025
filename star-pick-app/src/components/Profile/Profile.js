import MovieCatalog from '../MovieCatalog/MovieCatalog';
import './Profile.css';

function Profile() {
    const watchCount = 0;

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
                <MovieCatalog categoryName="Rocky" />
                <MovieCatalog categoryName="Avengers" />
            </div>

        </div>
    );
}

export default Profile;