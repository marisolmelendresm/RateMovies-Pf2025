import { useState } from "react";
import MovieCatalog from "../MovieCatalog/MovieCatalog";
import './Home.css';

function Home({ onLoad }) {

    return (
        <div>
            <h2 className="homeTitle">Let them know your take!</h2>
            <MovieCatalog categoryName="most-watched" onLoad={onLoad}></MovieCatalog>
            <MovieCatalog categoryName="best-rated" onLoad={onLoad}></MovieCatalog>
        </div>
    )
}

export default Home;