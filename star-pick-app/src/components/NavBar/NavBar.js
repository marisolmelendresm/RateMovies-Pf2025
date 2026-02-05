import './NavBar.css';
import { NavLink } from 'react-router-dom';
import arrowDown from '../../assets/arrow-down.png';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function NavBar() {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const { user, logout  } = useAuth();

    function getInitials(name) {
        const names = name.split(' ').slice(0, 2);
        const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
        return initials;
    }

    function toggleMenu(e) {
        e.stopPropagation();
        setDropdown(prev => !prev);
    }

    function clickLogout(e) {
        toggleMenu(e);
        logout();
    }

    useEffect(() => {
        function handleOutsideClick(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdown(false);
            }
        }

        if (dropdown) {
            document.addEventListener("click", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [dropdown]);
    
    return (
        <nav className="navBar">
            <div className="navBar-left">
                <NavLink to='/' className="navLink highlight padding">Home</NavLink>
                <NavLink to='/search' className="navLink highlight padding">Search</NavLink>
            </div>

            <h1 className="navBarCenter">Star Pick</h1>
            {user ? (
                <div className="navBar-right">
                    <div className="initials" onClick={toggleMenu}>{getInitials(user.fullName)}</div>
                    <img className="arrow" src={arrowDown} alt="Profile options dropdown" onClick={toggleMenu}></img>
                    <div ref={dropdownRef} className={dropdown ? "dropdown dropdownOpen" : "dropdown"}>
                        <div className="dropdownContent">
                            <div className="userInfo">
                                <h2 className="dropdownName">{user.fullName.split(' ').slice(0, 2).join(' ')}</h2>
                                <p className="username">{`@${user.username}`}</p>
                            </div>
                            <hr className="divider"></hr>
                            <div className="dropdownLinks">
                                <NavLink to='/profile' className="navLink padding" onClick={toggleMenu}>Profile</NavLink>
                                <NavLink to='/settings' className="navLink padding" onClick={toggleMenu}>Settings</NavLink>
                                <NavLink to='/login' className="navLink padding" onClick={clickLogout}>Logout</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <NavLink to='/login' className="navLink">Login</NavLink>
            )}
        </nav>
    )
}

export default NavBar;