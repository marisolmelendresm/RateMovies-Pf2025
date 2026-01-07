import { useEffect } from "react";
import MovieCatalog from "../MovieCatalog/MovieCatalog";
import './Home.css';

function Home() {

    return (
        <div>
            <h2 className="homeTitle">Let them know your take!</h2>
            <MovieCatalog categoryName="Barbie"></MovieCatalog>
            <MovieCatalog categoryName="Harry Potter"></MovieCatalog>
            <MovieCatalog categoryName="Star Wars"></MovieCatalog>
        </div>
    )
}

export default Home;