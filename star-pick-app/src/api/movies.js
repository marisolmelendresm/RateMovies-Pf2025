

async function getMovieRequest(imdbID) {
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=188ab898`);
    const result = await response.json();
    return result;
}

export async function getCategoryMovies({ category, userId }) {
    let url;

    if (category === "watch-again" || category === "favorites") {
        url = `http://localhost:3001/users/${userId}/movieCategory/${category}`;
    } else if (category === "best-rated" || category === "most-watched") {
        url = `http://localhost:3001/movieCategory/${category}`;
    }
    
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
        const moviePromises = await result.map(movieId => getMovieRequest(movieId));
        const moviesData = await Promise.all(moviePromises);
        return moviesData;
    }
}