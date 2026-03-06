import React, { useEffect, useRef, useState } from "react";
import "../style/form.scss";
import VanillaTilt from "vanilla-tilt";
import { Link } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {


  const { handleLogin, user, loading } = useAuth()

  const tiltRef = useRef(null);

  const navigate = useNavigate()


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin(username, email, password)

    navigate("/")

  }

  return (
    <div>
      <main>
        <div className="from-container" ref={tiltRef}>
          <h1>Login</h1>

          <br /><br />

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <br /><br />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <div className="main">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="icon"
                onClick={togglePassword}
                style={{ cursor: "pointer" }}
              >
                <TbLockPassword />
              </div>
            </div>

            <br />

            <button type="submit">Login</button>
          </form>

          <br />

          <p className="para">
            Have not account?
            <Link to="/register"> Register </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;