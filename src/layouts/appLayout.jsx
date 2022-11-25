import React from "react"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"
import "./appLayout.scss"
import "../styles/globalOverrides.scss"

const AppLayout = () => {
  return (
    <div className="theme -classic">
      <Outlet />
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element,
}

export default AppLayout
