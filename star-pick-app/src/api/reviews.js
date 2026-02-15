import { authFetch } from "./auth";
import { getMovieById } from "./movies";

export async function getReviews({ token }, logout) {

    try {
        const response = await authFetch("http://localhost:3001/users/reviews", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, logout);

        let result = await response.json();

        if (response.ok) {
            const moviePromises = result.map(review => getMovieById({ imdbID: review.movieId}));
            const moviesData = await Promise.all(moviePromises);
            for (let i = 0; i < moviesData.length; i++) {
                if (result[i].movieId === moviesData[i].imdbID) {
                    result[i].poster = moviesData[i].Poster;
                    result[i].title = moviesData[i].Title;
                };
            };
            return result
        } else {
            throw new Error(`Reviews HTTP ${response.status}`);
        }
    } catch(err) {
        throw new Error(`Reviews fetch failed: ${err}`);
    };
};