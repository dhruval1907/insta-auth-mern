import axios from "axios";

export async function registeruser(email, username, password) {
    try {
        const response = axios.post("http://localhost:3000/api/auth/register", {
            email,
            username,
            password
        }, {
            withCredentials: true
        })

        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function logineruser(email, username, password) {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
                username,
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );

        return response.data
    } catch (error) {
        console.log(error.response?.data);
    }
}

export async function getMe() {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/auth/get-me");

        return response.data
    } catch (error) {
        console.log(error.response?.data);
    }
}

