import './NavBar.css';
import { NavLink } from 'react-router-dom';
import arrowDown from '../../assets/arrow-down.png';
import { useState, useRef, useEffect } from 'react';

function NavBar() {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);

    function toggleMenu(e) {
        e.stopPropagation();
        setDropdown(prev => !prev);
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
                <NavLink to='/' className="navLink">Home</NavLink>
                <NavLink to='/search' className="navLink">Search</NavLink>
            </div>

            <h1 className="navBarCenter">Star Pick</h1>
            <div className="navBar-right">
                <div className="initials">MM</div>
                <img className="arrow" src={arrowDown} alt="Profile options dropdown" onClick={toggleMenu}></img>
                <div ref={dropdownRef} className={dropdown ? "dropdown dropdownOpen" : "dropdown"}>
                    <div className="dropdownContent">
                        <div className="userInfo">
                            <h2 className="name">Marisol Melendres</h2>
                            <p className="username">@marisolita</p>
                        </div>
                        <hr className="divider"></hr>
                        <div className="dropdownLinks">
                            <NavLink to='/profile' className="navLink" onClick={toggleMenu}>Profile</NavLink>
                            <NavLink to='/settings' className="navLink" onClick={toggleMenu}>Settings</NavLink>
                            <NavLink to='/login' className="navLink" onClick={toggleMenu}>Logout</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;