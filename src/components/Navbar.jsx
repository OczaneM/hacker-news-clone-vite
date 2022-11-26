import React from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.scss"

// NavLink tracks its own internal active state/class
const Navbar = () => {
  return (
    <div className="nav-bar">
      <NavLink to="/">latest</NavLink>
      {" | "}
      <NavLink to="/starred">starred</NavLink>
    </div>
  )
}

export default Navbar
