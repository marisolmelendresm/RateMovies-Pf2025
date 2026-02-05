import MovieCatalog from "../MovieCatalog/MovieCatalog";
import './Home.css';

function Home() {

    return (
        <div>
            <h2 className="homeTitle">Let them know your take!</h2>
            <MovieCatalog categoryName="most-watched"></MovieCatalog>
            <MovieCatalog categoryName="best-rated"></MovieCatalog>
        </div>
    )
}

export default Home;