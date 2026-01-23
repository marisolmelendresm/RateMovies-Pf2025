import './MovieCatalog.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { useUser } from '../../context/UserContext';

function MovieCatalog({ categoryName }) {
    const [movies, setMovies] = useState([]);
    const { setLoading } = useLoading();
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;
        const getMovieRequest = async (imdbID) => {
            const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=188ab898`);
            const result = await response.json();
            return result;
        }
        const getCategoryMovies = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/users/${user.id}/movieCategory/${categoryName}`);
                const result = await response.json();
                if (response.ok) {
                    result.length = 12;
                    const moviePromises = await result.map(movieId => getMovieRequest(movieId));
                    const moviesData = await Promise.all(moviePromises);
                    setMovies(moviesData);
                }
            } finally {
                setLoading(false);
            }
        }
        getCategoryMovies();
    }, [categoryName, user]);

    return (
        <div>
            <h2 className="categoryName">{categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
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