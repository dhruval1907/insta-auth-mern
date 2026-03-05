import { createContext, useState } from "react";
import { getMe, logineruser, registeruser } from "./services/auth.api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (username, email, password) => {

        setLoading(true)

        try {

            const response = await logineruser(username, email, password)

            if (response) {
                setUser(response.user)
            }

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (username, email, password) => {

        setLoading(true);

        try {
            const response = await registeruser(username, email, password);
            setUser(response.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, handleLogin, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
}