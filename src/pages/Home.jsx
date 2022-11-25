import React from "react"
import PropTypes from "prop-types"
import Story from "../components/Story"
import "./Home.scss"

const Home = ({ storyIds }) => {
  const savedToggle = (
    <div className="toggle-saved-buttons">
      <button>latest</button> | <button>starred</button>
    </div>
  )

  return (
    <div className="home-page">
      <div className="heading">
        <div className="y-icon">Y</div>
        <div className="title">Hacker News</div>
        {savedToggle}
      </div>
      <div className="body">
        {storyIds.map((storyId, index) => {
          return <Story key={storyId} storyId={storyId} index={index + 1} />
        })}
        <button className="showmore">show more</button>
      </div>
      <div className="footer">
        <div className="title">Hacker News</div>
        {savedToggle}
      </div>
    </div>
  )
}

Home.propTypes = {
  storyIds: PropTypes.array,
}

export default Home
