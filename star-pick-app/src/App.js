import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<h2>Search Page Coming Soon!</h2>} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
