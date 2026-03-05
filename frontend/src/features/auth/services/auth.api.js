import axios from "axios";

async function registeruser(email, username, password) {
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

async function logineruser(email, username, password) {
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


async function logineruser(email, username, password) {
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

async function logineruser(email, username, password) {
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