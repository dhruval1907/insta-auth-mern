import React, { useEffect, useRef, useState } from 'react'
import "../style/reg.scss"
import VanillaTilt from 'vanilla-tilt'
import { Link } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import axios from "axios";

const Register = () => {

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const tiltRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        VanillaTilt.init(tiltRef.current, {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 0.5
        })
    }, [])

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    async function handleSubmit(e) {
        e.preventDefault()

      
    }

    return (
        <div>
            <main>
                <div className="from-container" ref={tiltRef}>
                    <h1>Register</h1>
                    <br />
                    <form
                        onSubmit={(e) => {
                            handleSubmit(e)
                        }}>

                        <input
                            onInput={(e) => {
                                setusername(e.target.value)
                            }}
                            type="text" placeholder="Enter username" />
                        <br /><br />

                        <input
                            onInput={(e) => {
                                setemail(e.target.value)
                            }}
                            type="email" placeholder="Enter email" />
                        <br /><br />

                        <div className="main">
                            <input
                                onInput={(e) => {
                                    setpassword(e.target.value)
                                }}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                            />

                            <div
                                className="icon"
                                onClick={togglePassword}
                                style={{ cursor: "pointer" }}
                            >
                                <TbLockPassword />
                            </div>
                        </div>

                        <br /><br />

                        <button>Register</button>

                    </form>

                    <br />

                    <p className='para'>
                        Already have an account?
                        <Link to="/login"> Login </Link>
                    </p>

                </div>
            </main>
        </div>
    )
}

export default Register