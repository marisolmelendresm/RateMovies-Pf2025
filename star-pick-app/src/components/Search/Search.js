import './Search.css';
import { useState, useEffect } from 'react'
import MovieCatalog from '../MovieCatalog/MovieCatalog';

export default function Search() {
    const [searchInput, setSearchInput] = useState('');
    
    return (
        <div>
            <div className="searchContainer">
                <h2>Search movies</h2>
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
            </div>
            <MovieCatalog categoryName={`${searchInput ? `"${searchInput}"` : ''}`} search={searchInput} orientation='vertical' ></MovieCatalog>
        </div>
    );
}