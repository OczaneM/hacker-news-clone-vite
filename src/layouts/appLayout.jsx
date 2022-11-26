import React, { useState } from "react"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import "./appLayout.scss"
import "../styles/globalOverrides.scss"
import moonIcon from "../assets/icons8-moon-symbol-30.png"
import sunIcon from "../assets/icons8-sun.svg"

const AppLayout = () => {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`theme -classic ${darkMode && "-darkmode"}`}>
      <button className="themetoggle" onClick={() => setDarkMode(!darkMode)}>
        <img src={darkMode ? sunIcon : moonIcon} />
      </button>
      <Outlet />
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element,
}

export default AppLayout
