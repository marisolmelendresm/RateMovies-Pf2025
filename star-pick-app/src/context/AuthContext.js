import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loggedOutMsg, setLoggedOutMsg] = useState(null);

    function isTokenExpired(decodedToken) {
        return decodedToken.exp * 1000 < Date.now();
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                if (isTokenExpired(decoded)) {
                    localStorage.removeItem("token");
                    setLoggedOutMsg("Session Expired, please login again");
                    return;
                }

                setToken(storedToken);
                setUser(decoded);
            } catch (err) {
                console.error('Invalid token');
                setLoggedOutMsg("Logged out");
                localStorage.removeItem("token");
            }
        }

    }, []);

    function login(newToken) {
        localStorage.setItem("token", newToken);
        setLoggedOutMsg(null);
        setToken(newToken);
        setUser(jwtDecode(newToken));
    }

    function logout() {
        localStorage.removeItem("token");
        setLoggedOutMsg("Logged out");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, token, loggedOutMsg, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth() {
    return useContext(AuthContext);
};