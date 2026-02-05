import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieDetail.css';
import Question from '../Question/Question';
import StarRating from '../StarRating/StarRating.js';
import { useLoading } from '../../context/LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { getMovieById } from '../../api/movies.js'

function MovieDetail() {
    const navigate = useNavigate();
    const { imdbID } = useParams();
    const { setLoading } = useLoading();
    const { user } = useAuth();

    const [movieDetails, setMovieDetails] = useState({});
    const [watched, setWatched] = useState(false);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadMovie = async () => {
            
            try {
                setLoading(true);
                const result = await getMovieById({ imdbID });
                setMovieDetails(result);
            } catch(err) {
                console.error("Error fetching movie", err)
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [imdbID]);

    const recordWatch = async () => {
        setWatched(true);
        const watchRecord = {userId: user.id, movieId: imdbID};

        const response = await fetch("http://localhost:3001/watched", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(watchRecord)
        })

        const result = await response.json();

        if (!response.ok) {
            console.log(result.message);
        }
    }

    const saveReview = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const reviewText = formData.get("review");
        const review = {userId: user.id, movieId: movieDetails.imdbID, star: rating, text: reviewText};

        if (!rating) {
            setError("Please add a star rating before submitting");
            return;
        }

        try {
            setLoading(true)
            const response = await fetch("http://localhost:3001/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            })
            if (response.ok) {
                navigate("/profile");
            }
        } finally {
            setLoading(false);
        }
    }

    

    return (
        <div className="movieDetail">
            <div className="moviePosterContainer"><img className="moviePoster" src={movieDetails.Poster}></img></div>
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
                    ></textarea>
                    {error && <p className="errorMessage" aria-live="polite">{error}</p>}
                    <button disabled={!watched} className={`saveReviewButton ${watched ? '' : 'disabled'}`} type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}

export default MovieDetail;