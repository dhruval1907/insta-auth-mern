import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/posts/pages/Feed"
import Createpost from "./features/posts/pages/Createpost"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createpost" element={<Createpost />} />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes