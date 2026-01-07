import './Login.css';

function Login() {
    return (
        <div className="loginContainer">
            <h1 className="loginTitle">Login</h1>

            <form className="loginForm">
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

                <button type="submit" className="loginButton">Login</button>
            </form>
            <p className="signupOpt">New to StarPick? <a href="/signup" className="signupLink">Join the fun</a></p>
            
        </div>
    );
}

export default Login;