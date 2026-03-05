import React, { useEffect, useRef, useState } from 'react'
import "../style/form.scss"
import VanillaTilt from 'vanilla-tilt'
import { Link } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";

const Login = () => {

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

  return (
    <div>
      <main>
        <div className="from-container" ref={tiltRef}>
          <h1>Login</h1>

          <br /><br />

          <form>
            <input type="text" placeholder="Enter username" />
            <br /><br />

            <div className='main'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />

              <div className='icon' onClick={togglePassword} style={{cursor:"pointer"}}>
                <TbLockPassword />
              </div>
            </div>

            <br /><br /><br />

            <button>Login</button>
          </form>

          <br /><br />

          <p className='para'>
            have not account?
            <Link to="/register"> reg </Link>
          </p>

        </div>
      </main>
    </div>
  )
}

export default Login