import React from "react"
import PropTypes from "prop-types"
import Story from "../components/Story"
import NoStories from "./NoStories"
import "./Home.scss"

const Home = ({ storyIds = [], storiesFetchSuccess }) => {
  if (storiesFetchSuccess && storyIds.length === 0) return <NoStories />

  return (
    <div className="home-page">
      {storiesFetchSuccess ? (
        <>
          {storyIds.map((storyId) => {
            return <Story key={storyId} storyId={storyId} />
          })}
          <button className="showmore">show more</button>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

Home.propTypes = {
  storyIds: PropTypes.array,
  storiesFetchSuccess: PropTypes.bool,
}

export default Home
