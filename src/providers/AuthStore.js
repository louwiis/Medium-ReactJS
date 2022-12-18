import { createContext, useState } from "react";
export const useAuth = createContext()

export function AuthProvider(props) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    return (
        <useAuth.Provider value={{
            token,
            setToken,
            user,
            setUser,
        }}>
            {props.children}
        </useAuth.Provider>
    )
}