import React from 'react'
import "../../src/components/Nav.scss";
import { useNavigate } from "react-router-dom";

const Nav = () => {

  const navigate = useNavigate()

  return (
    <div className='nav-bar'>
      <p>Wanna create one ?</p>
      <button
        onClick={() => {
          navigate("/Createpost")
        }}
      >Create one</button>

    </div>
  )
}

export default Nav