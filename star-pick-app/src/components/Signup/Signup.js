import './Signup.css';
import { useState } from 'react';

function Signup() {
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup data submitted:', signupData);
    }

    return (
        <div className="signupContainer">
            <h1 className="signupTitle">Create Your Star Pick Account</h1>
            <form className="signupForm" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Personal information</legend>
                    <div className="inputContainer">
                        <label className="signupLabel" htmlFor="fullName">
                            Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            className="signupInput"
                        />
                    </div>

                    <div className="inputContainer">
                        <label className="signupLabel" htmlFor="email">
                            Email</label>
                        <input
                            type="email"
                            id="email"
                            className="signupInput"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Account credentials</legend>
                    <div className="inputContainer">
                        <label className="signupLabel" htmlFor="username">
                            Username</label>
                        <input
                            type="text"
                            id="username"
                            className="signupInput"
                        />
                    </div>
                    <div className="inputContainer">
                        <label className="signupLabel" htmlFor="password">
                            Password</label>
                        <input
                            type="password"
                            id="password"
                            className="signupInput"
                        />
                    </div>
                </fieldset>
                <button type="submit" className="signupButton">Sign Up</button>
            </form>
            <p className="loginOpt">Already have an account? <a className="loginLink" href="/login">Log in</a></p>
        </div>
    );
}

export default Signup;