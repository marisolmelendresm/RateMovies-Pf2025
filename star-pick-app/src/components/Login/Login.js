import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
    const [error, setError] = useState(null);
    const { setLoading } = useLoading();
    const { login } = useAuth();

    const navigate = useNavigate();
    const delay = (ms) =>
        new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const data = {
            username: formData.get("username"),
            password: formData.get("password")
        };

        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (!response.ok) {
            setError(result.message);
        } else {
            const token = result.token;
            login(token);
            setError(null);
            try {
                setLoading(true);
                await delay(800);
                navigate("/profile");
            } finally {
                setLoading(false);
            }
            
        }
    }

    return (
        <div className="loginContainer">
            <h1 className="loginTitle">Login</h1>

            <form className="loginForm" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Login credentials</legend>
                    <div className="inputContainer">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className="inputContainer">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                </fieldset>

                {error && <p className="errorMessage" aria-live="polite">{error}</p>}

                <button type="submit" className="loginButton">Login</button>
            </form>
            <p className="signupOpt">New to StarPick? <a href="/signup" className="signupLink">Join the fun</a></p>
            
        </div>
    );
}

export default Login;