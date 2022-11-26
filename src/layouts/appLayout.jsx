import React, { useState } from "react"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import moonIcon from "../assets/icons8-moon-symbol-30.png"
import sunIcon from "../assets/icons8-sun.svg"
import yIcon from "../assets/y18.gif"
import Navbar from "../components/Navbar"
import "./appLayout.scss"
import "../styles/globalOverrides.scss"

// Layout for the whole app
// Displays components that are shared across all pages
const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`layout -theme1 ${darkMode && "-darkmode"}`}>
      <button className="themetoggle" onClick={() => setDarkMode(!darkMode)}>
        <img src={darkMode ? sunIcon : moonIcon} />
      </button>
      <div className="heading">
        <Link to="/">
          <img src={yIcon} className="y-icon" alt="Y Combination News" />
        </Link>
        <div className="title">Hacker News</div>
        <Navbar />
      </div>
      <Outlet /> {/* for rendering child routes */}
      <div className="footer">
        <div className="title">Hacker News</div>
        <Navbar />
      </div>
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element,
}

export default AppLayout
