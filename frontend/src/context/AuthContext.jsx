import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [Token, setToken] = useState(localStorage.getItem("token") || null);
    const [User, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

    useEffect(() => {
        if (Token) {
            localStorage.setItem("token", Token);
        }
        if (User) {
            localStorage.setItem("user", JSON.stringify(User));
        }
    }, [Token, User]);

    function LogOut() {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ Token, setToken, User, setUser, LogOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}