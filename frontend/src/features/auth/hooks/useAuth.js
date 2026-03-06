import { useContext } from 'react'
import { AuthContext } from "../auth.context";
import { logineruser, registeruser, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)


    const { user, setUser, loading, setLoading } = context

    const handleLogin = async (username, email, password) => {

        setLoading(true)

        const response = await logineruser(username, email, password)

        setUser(response.user)

        setLoading(false)
    }

    const handleRegister = async (username, email, password) => {

        setLoading(true);

        const response = await registeruser(username, email, password);

        setUser(response.user);

        setLoading(false);
    }

    return {
        user, loading, handleLogin, handleRegister
    }
};

