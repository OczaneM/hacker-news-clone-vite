import PropTypes from "prop-types"

const AppTitle = ({ size = "" }) => {
  return <div className={`title ${size}`}>Hacker News</div>
}

AppTitle.propTypes = {
  size: PropTypes.string,
}

export default AppTitle
