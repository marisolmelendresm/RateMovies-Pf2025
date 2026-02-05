

export async function getMovieById({ imdbID }) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=188ab898`);
        const result = await response.json();
        return result;
    } catch(err) {
        console.error("OMDb fetch failed");
        return null;
    }
    
}

async function getMoviesBySearch({ search }) {
    const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=188ab898`);
    const result = await response.json();
    if (result.Response === 'True') {
        const movies = result.Search.filter(movie => 
            movie && movie.Poster && movie.Poster !== "N/A"
        );
        return movies;
    }
    return [];
}

export async function getMoviesByCategory({ category, token }) {
    let url;

    if (category === "watch-again" || category === "favorites") {
        url = `http://localhost:3001/users/movieCategory/${category}`;
    } else if (category === "best-rated" || category === "most-watched") {
        url = `http://localhost:3001/movieCategory/${category}`;
    }

    if (!url) return [];
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (response.ok) {
        const result = await response.json();
        const moviePromises = result.map(movieId => getMovieById({ imdbID: movieId}));
        const moviesData = await Promise.all(moviePromises);
        return moviesData.filter(movie => 
            movie && movie.Poster && movie.Poster !== "N/A"
        );
    } else {
        throw new Error(`HTTP ${response.status}`)
    }
}

export async function getMovies({ category, token, value }) {
    if (value) {
        return getMoviesBySearch({ search: value });
    } else {
        return getMoviesByCategory({ category: category, token: token });
    }
}

export async function getWatchedCountReq({ token }) {
    if (!token) return;

    const response = await fetch(`http://localhost:3001/users/watchedCount`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP watched count error ${response.status}`);
    } else {
        return result;
    }
}