import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import MovieDetail from './components/MovieDetail/MovieDetail';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Search from './components/Search/Search';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import { useLoading } from './context/LoadingContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { loading } = useLoading();
  const { loggedOutMsg, setLoggedOutMsg } = useAuth();

  return (
    <div>
      <div className={loading ? 'loading' : ''}>
        <div className={loading ? 'loader' : ''}/>
      </div>
      <NavBar/>
      { loggedOutMsg && 
        (
          <ErrorMessage message={loggedOutMsg} position="top-right" closeMessage={() => { setLoggedOutMsg(null) }}/>
        )
      }
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/movie/:imdbID" element={<MovieDetail/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
