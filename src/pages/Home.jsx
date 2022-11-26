import React from "react"
import PropTypes from "prop-types"
import Story from "../components/Story"
import yIcon from "../assets/y18.gif"
import { Link } from "react-router-dom"
import "./Home.scss"

const Home = ({ storyIds = [], activeNav = "", setActiveNav }) => {
  const navbar = (
    <div className="home-navbar">
      <button
        onClick={() => setActiveNav("latest")}
        className={activeNav === "latest" ? "-active" : ""}
      >
        latest
      </button>
      |
      <button
        onClick={() => setActiveNav("starred")}
        className={activeNav === "starred" ? "-active" : ""}
      >
        starred
      </button>
    </div>
  )

  return (
    <div className="home-page">
      <div className="heading">
        <Link to="/">
          <img src={yIcon} className="y-icon" alt="Y Combination News" />
        </Link>
        <div className="title">Hacker News</div>
        {navbar}
      </div>
      <div className="body">
        {storyIds.map((storyId) => {
          return <Story key={storyId} storyId={storyId} />
        })}
        <button className="showmore">show more</button>
      </div>
      <div className="footer">
        <div className="title">Hacker News</div>
        {navbar}
      </div>
    </div>
  )
}

Home.propTypes = {
  storyIds: PropTypes.array,
  setActiveNav: PropTypes.func,
  activeNav: PropTypes.string,
}

export default Home
