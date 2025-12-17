import './StarRating.css';
import emptyStar from '../../assets/empty-star.png';
import filledStar from '../../assets/yellow-star.png';
import { useState } from 'react';

function StarRating() {
    const [rating, setRating] = useState(0);

    function handleClick(starValue) {
        return () => {
            setRating(starValue);
        };
    }
    return (    
        <div className="starRating">
            <img className="starItem" src={rating >= 1 ? filledStar : emptyStar} onClick={handleClick(1)}></img>
            <img className="starItem" src={rating >= 2 ? filledStar : emptyStar} onClick={handleClick(2)}></img>
            <img className="starItem" src={rating >= 3 ? filledStar : emptyStar} onClick={handleClick(3)}></img>
            <img className="starItem" src={rating >= 4 ? filledStar : emptyStar} onClick={handleClick(4)}></img>
            <img className="starItem" src={rating >= 5 ? filledStar : emptyStar} onClick={handleClick(5)}></img>
        </div>
    );
}

export default StarRating;