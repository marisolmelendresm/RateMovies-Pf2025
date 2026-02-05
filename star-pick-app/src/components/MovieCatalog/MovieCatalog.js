import './MovieCatalog.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { useAuth } from '../../context/AuthContext';
import { getMovies } from '../../api/movies';

function MovieCatalog({ categoryName, search, orientation }) {
    const [movies, setMovies] = useState([]);
    const { setLoading } = useLoading();
    const { token } = useAuth();

    if (!orientation) {
        orientation = 'horizontal';
    }

    useEffect(() => {
        if (!token || !categoryName) return;
        const loadMovies = async () => {
            try {
                setLoading(true);
                const result = await getMovies({ category: categoryName, token: token,  value: search });
                setMovies(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (!categoryName) {
            setMovies([]);
        }

        loadMovies();
    }, [categoryName, token, search]);

    return (
        <div>
            { movies.length ? 
                <div className="movieCatalogContainer">
                    <h2 className="categoryName">{categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                    <ul className={`posterList ${orientation}`}>{movies.map((movie) => {
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
            : 
            null }
        </div>
    )
}

export default MovieCatalog;