import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { useState, useEffect } from 'react';
import { useLoading } from './context/LoadingContext';
import { useUser } from './context/UserContext';

function App() {
  //const [loggedIn, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const { loading } = useLoading();
  const { setUser } = useUser();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setAuthChecked(true);
  }, [])

  return (
    <div>
      <div className={loading ? 'loading' : ''}>
        <div className={loading ? 'loader' : ''}/>
      </div>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<h2>Search Page Coming Soon!</h2>} />
        <Route path="/movie/:imdbID" element={<MovieDetail/>} />
        <Route path="/profile" element={<Profile authChecked={authChecked}/>} />
      </Routes>
    </div>
  );
}

export default App;
