import './StarRating.css';
import { useState } from 'react';
import Star from '../Star/Star';

function StarRating({ disabled }) {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    function handleHover(e, index) {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const isHalf = (e.clientX - left) < width / 2;

        setHoveredStar(isHalf ? index + 0.5 : index + 1);
    }

    return ( 
        <div>
            { !disabled ? (
                <div className="starRating" onMouseLeave={() => setHoveredStar(null)}>
                    {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                        key={i}
                        fill={
                        hoveredStar
                            ? hoveredStar >= i + 1
                            ? 100
                            : hoveredStar >= i + 0.5
                            ? 50
                            : 0
                            : rating >= i + 1
                            ? 100
                            : rating >= i + 0.5
                            ? 50
                            : 0
                        }
                        onHover={(e) => handleHover(e, i)}
                        onClick={() => setRating(hoveredStar)}
                    />
                    ))}
                </div>
            ) : (
                <div className="starRating">
                    {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                        disabled={disabled}
                        key={i}
                    />
                    ))}
                </div>
            )}
        </div>
    );
}

export default StarRating;