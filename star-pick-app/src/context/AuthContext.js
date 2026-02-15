import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loggedOutMsg, setLoggedOutMsg] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (!token) return;

        const decoded = jwtDecode(token);

        const expirationTime = decoded.exp * 1000;
        const currentTime = Date.now();

        const timeout = expirationTime - currentTime;

        if (timeout <= 0) {
            logout("Session expired, please login again");
            return;
        }

        const timer = setTimeout(() => {
            logout("Session expired, please login again");
        }, timeout);

        return () => clearTimeout(timer);

    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;

        try {
            const decoded = jwtDecode(storedToken);
            setUser(decoded);
            setToken(storedToken);
        } catch {
            localStorage.removeItem("token");
        }

        setAuthChecked(true);
    }, []);

    function isTokenExpired(decodedToken) {
        return decodedToken.exp * 1000 < Date.now();
    }

    useEffect(() => {
        const handleFocus = () => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) return;

            try {
                const decoded = jwtDecode(storedToken);

                if (isTokenExpired(decoded)) {
                    logout("Session expired, please login again");
                }
            } catch {
                logout("Invalid session");
            }
        };

        window.addEventListener("focus", handleFocus);

        return () => window.removeEventListener("focus", handleFocus);
    }, []);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setLoggedOutMsg(null);
        setToken(newToken);
        setUser(jwtDecode(newToken));
    }

    function logout(message) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setLoggedOutMsg(message);
    }

    return (
        <AuthContext.Provider value={{authChecked, user, token, loggedOutMsg, login, logout, setLoggedOutMsg}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext);
};