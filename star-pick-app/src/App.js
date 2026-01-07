import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<h2>Search Page Coming Soon!</h2>} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
