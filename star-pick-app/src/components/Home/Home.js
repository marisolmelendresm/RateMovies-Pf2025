import { useState } from "react";
import MovieCatalog from "../MovieCatalog/MovieCatalog";
import './Home.css';

function Home({ onLoad }) {
    const [loadedCatalog, setLoadedCatalog] = useState(false);

    return (
        <div>
            <h2 className="homeTitle">Let them know your take!</h2>
            <MovieCatalog categoryName="watch-again" onLoad={onLoad}></MovieCatalog>
            <MovieCatalog categoryName="watch-again" onLoad={onLoad}></MovieCatalog>
            <MovieCatalog categoryName="watch-again" onLoad={onLoad}></MovieCatalog>
        </div>
    )
}

export default Home;