import { useEffect } from "react";
import MovieCatalog from "../MovieCatalog/MovieCatalog";

function Home() {

    return (
        <div style={{color: 'white'}}>
            <MovieCatalog categoryName="Barbie"></MovieCatalog>
            <MovieCatalog categoryName="Harry Potter"></MovieCatalog>
            <MovieCatalog categoryName="Star Wars"></MovieCatalog>
        </div>
    )
}

export default Home;