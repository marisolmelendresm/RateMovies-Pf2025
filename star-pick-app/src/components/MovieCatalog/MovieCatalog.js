import './MovieCatalog.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MovieCatalog(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovieRequest = async () => {
            const url = `http://www.omdbapi.com/?s=${props.categoryName}&apikey=188ab898`;
            const response = await fetch(url);
            const responseJson = await response.json();
            setMovies(responseJson.Search);
        };

        getMovieRequest();
    }, [props.categoryName]);

    return (
        <div>
            <h2 className="categoryName">{props.categoryName}</h2>
            <ul className='posterList'>{movies.map((movie) => {
                return (
                    <li key={movie.imdbID}>
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img src={movie.Poster} alt={`${movie.Title} poster`}></img>
                        </Link>
                    </li>
                    )
            } )}
            </ul>
        </div>
    )
}

export default MovieCatalog;