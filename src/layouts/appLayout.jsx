import React from "react"
import PropTypes from "prop-types"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.element,
}

export default AppLayout
