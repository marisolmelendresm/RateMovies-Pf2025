import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieDetail.css';
import Question from '../Question/Question';
import StarRating from '../StarRating/StarRating.js';
import { Navigate } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { getMovieById } from '../../api/movies.js'
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';

function MovieDetail() {
    const navigate = useNavigate();
    const { imdbID } = useParams();
    const { setLoading } = useLoading();
    const { token, user, setLoggedOutMsg, authChecked, logout } = useAuth();

    const [movieDetails, setMovieDetails] = useState({});
    const [watched, setWatched] = useState(false);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        if (authChecked && !token) setLoggedOutMsg("Please login to rate a movie");

        const loadMovie = async () => {
            
            try {
                setError(null);
                setLoading(true);
                const result = await getMovieById({ imdbID }, logout);
                setMovieDetails(result);
            } catch(err) {
                setError("Could not load movie. Please try again later");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [imdbID, authChecked, token]);

    const recordWatch = async () => {
        const watchRecord = {movieId: imdbID};

        try {
            const response = await fetch("http://localhost:3001/users/watched", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(watchRecord)
            })

            const result = await response.json();

            if (!response.ok) {
                setError("Could not save watch. Please try again later");
                console.error(result.message);
                return;
            }

            setWatched(true);
        } catch(err) {
            setError("Could not save watch. Please try again later");
            console.error("Error saving watch: ", err);
        }
    };

    const saveReview = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const reviewText = formData.get("review");
        const review = {movieId: movieDetails.imdbID, star: rating, text: reviewText};

        try {
            setLoading(true)
            const response = await fetch("http://localhost:3001/users/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(review)
            })
            if (response.ok) {
                navigate("/profile");
            } else {
                const result = await response.json();
                setError("Could not save review. Please try again later");
                console.error(result.message);
                return;
            }
        } catch(err) {
            setError("Could not save review. Please try again later");
            console.error("Error saving review: ", err);
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div>
            { authChecked ? 
                token ? 
                    user ?
                        (<div className="movieDetail">
                            { error && <ErrorMessage message={error} position='top-right' closeMessage={() => setError(null)}></ErrorMessage>}
                            <div className="moviePosterContainer">
                                <img className="moviePoster poster" src={movieDetails.Poster}></img>
                            </div>
                            <div className="movieInfo">
                                <h2 className="movieTitle header">{movieDetails.Title}</h2>
                                <p className="movieYear header">{movieDetails.Year}</p>
                                <Question checked={watched} onClick={recordWatch}/>
                                
                                <b className="subtitle">Rate it!</b>
                                <form className="rating" onSubmit={saveReview}>
                                    <StarRating disabled={!watched} setRating={setRating} rating={rating}/>
                                    <label className="hiddenLabel" htmlFor="review">Review</label>
                                    <textarea
                                        className={`inputBox ${watched ? '' : 'disabled'}`}
                                        disabled={!watched}
                                        id="review"
                                        name="review"
                                        placeholder="Write your take"
                                        maxLength="200"
                                    ></textarea>
                                    <button disabled={!watched} className={`saveReviewButton ${watched ? '' : 'disabled'}`} type="submit">Save</button>
                                </form>
                            </div>
                        </div>)
                        : 
                            <Navigate to="/login" replace />
                    :
                        <Navigate to="/login" replace />
                :
                    null
            }
        </div>
    )
}

export default MovieDetail;