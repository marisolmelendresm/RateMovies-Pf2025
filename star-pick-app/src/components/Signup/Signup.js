import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { useState } from 'react';
import { useLoading } from '../../context/LoadingContext';

function Signup() {
    const [error, setError] = useState(null);
    const { setLoading } = useLoading();

    const navigate = useNavigate();

    const delay = (ms) =>
        new Promise(resolve => setTimeout(resolve, ms));
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            fullName: formData.get("fullName"),
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password")
        };

        const response = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) {
            setError(result.message);
        } else {
            try {
                setError(null);
                setLoading(true);
                await delay(700);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        }
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
                            name="fullName"
                            className="signupInput"
                            required
                        />
                    </div>

                    <div className="inputContainer">
                        <label className="signupLabel" htmlFor="email">
                            Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="signupInput"
                            required
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
                            name="username"
                            className="signupInput" 
                            required
                        />
                    </div>
                    <div className="inputContainer">
                        <label className="signupLabel" htmlFor="password">
                            Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="signupInput"
                            required
                        />
                    </div>
                </fieldset>
                {error && <p className="errorMessage" aria-live="polite">{error}</p>}
                <button type="submit" className="signupButton">Sign Up</button>
            </form>
            <p className="loginOpt">Already have an account? <a className="loginLink" href="/login">Log in</a></p>
        </div>
    );
}

export default Signup;