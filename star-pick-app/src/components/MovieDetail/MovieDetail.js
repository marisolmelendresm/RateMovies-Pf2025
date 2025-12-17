import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './MovieDetail.css';
import Question from '../Question/Question';
import StarRating from '../StarRating/StarRating.js';
import ReviewInputBox from '../ReviewInputBox/ReviewInputBox.js';

function MovieDetail() {
    const { imdbID } = useParams();
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        const getMovieRequest = async () => {
            const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=188ab898`;
            const response = await fetch(url);
            const responseJson = await response.json();
            setMovieDetails(responseJson);
        };

        getMovieRequest();
    }, [imdbID]);

    return (
        <div className="movieDetail">
            <div className="moviePosterContainer"><img className="moviePoster" src={movieDetails.Poster}></img></div>
            <div className="movieInfo">
                <h1 className="movieTitle header">{movieDetails.Title}</h1>
                <h2 className="movieYear header">{movieDetails.Year}</h2>
                <Question/>
                <b className="subtitle">Rate it!</b>
                <div className="rating">
                    <StarRating/>
                    <ReviewInputBox/>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;