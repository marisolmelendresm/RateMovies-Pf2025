import StarRating from '../StarRating/StarRating';
import './Review.css';

export default function Review({ posterSrc, title, stars, reviewText }) {

    return (
        <div className="reviewContainer">
            <img className="reviewPoster poster" src={posterSrc} alt="Movie Poster"></img>
            <div className="reviewContent">
                <h3 className="reviewTitle">{title}</h3>
                <StarRating className="reviewRating" rating={stars} disabled={true} size='S'></StarRating>
                {reviewText && <textarea className="reviewText" disabled defaultValue={reviewText}></textarea>}
            </div>
        </div>
    )
}