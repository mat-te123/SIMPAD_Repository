import { createContext, useContext, useState, useEffect, use } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [Token, setToken] = useState(localStorage.getItem("token") || null);
    const [User, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [UserCompleteData, setUserCompleteData] = useState(localStorage.getItem("userCompleteData") ? JSON.parse(localStorage.getItem("userCompleteData")) : null);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") ? JSON.parse(localStorage.getItem("isAdmin")) : false);

    useEffect(() => {
        if (Token) {
            localStorage.setItem("token", Token);
        }
        if (User) {
            localStorage.setItem("user", JSON.stringify(User));
        }

        if (UserCompleteData) {
            localStorage.setItem("userCompleteData", JSON.stringify(UserCompleteData));
        }
        if (isAdmin !== null) {
            localStorage.setItem("isAdmin", isAdmin);
        }
    }, [Token, User, UserCompleteData, isAdmin]);

    function LogOut() {
        setToken(null);
        setUser(null);
        setUserCompleteData(null);
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userCompleteData");
        localStorage.removeItem("isAdmin");
    }

    return (
        <AuthContext.Provider value={{ Token, setToken, User, setUser, UserCompleteData, setUserCompleteData, isAdmin, setIsAdmin, LogOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}