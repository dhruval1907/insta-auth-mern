import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<h1 style={{ color: "black" }}>Welcome to the home page</h1>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes