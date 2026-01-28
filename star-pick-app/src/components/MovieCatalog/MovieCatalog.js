import './MovieCatalog.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { useUser } from '../../context/UserContext';
import { getCategoryMovies } from '../../api/movies';

function MovieCatalog({ categoryName }) {
    const [movies, setMovies] = useState([]);
    const { setLoading } = useLoading();
    const { user } = useUser();

    useEffect(() => {
        if (!user || !categoryName) return;
        const loadMovies = async () => {
            try {
                setLoading(true);
                const result = await getCategoryMovies({ category: categoryName, userId: user.id })
                setMovies(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadMovies();
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