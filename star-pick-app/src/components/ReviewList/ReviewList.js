import './ReviewList.css';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { getReviews } from '../../api/reviews';
import Review from '../Review/Review';
import { useLoading } from '../../context/LoadingContext';

export default function ReviewList() {
    const { token, logout } = useAuth();
    const { setLoading } = useLoading();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!token) return;

        const getReviewsList = async () => {
            try {
                setLoading(true);
                const result = await getReviews({token}, logout);
                setReviews(result);
                console.log(result);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        
        getReviewsList();
    }, [token]);

    return (
        <div className="reviewListContainer">
            { reviews.length === 0 ?
                (
                    <div>
                        No reviews yet
                    </div>
                ) :
                    <ul className="reviewList">
                        {reviews.map(review => {
                            return (
                                <li className="reviewListItem">
                                    <Review 
                                    posterSrc={review.poster} 
                                    title={review.title} 
                                    stars={review.star} 
                                    reviewText={review.text}></Review>
                                </li>
                            )
                        })}
                    </ul>
            }
        </div>
    )
}