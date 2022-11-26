import React from "react"
import PropTypes from "prop-types"
import Story from "../components/Story"
import NoStories from "./NoStories"
import "./Home.scss"

// Displays stories based on id
const Home = ({
  storyIds = [],
  storiesFetchSuccess,
  showMore,
  currentIndex = 0,
}) => {
  // if stories havent been fetched, should show Loading, not NoStories
  if (storiesFetchSuccess && storyIds.length === 0) return <NoStories />

  return (
    <div className="home-page">
      {storiesFetchSuccess ? (
        <>
          {storyIds.map((storyId, index) => {
            return (
              <Story
                key={storyId}
                storyId={storyId}
                index={index + currentIndex + 1}
              />
            )
          })}
          <button className="showmore" onClick={showMore}>
            show more
          </button>
        </>
      ) : (
        <div>Loading</div> // Placeholder for Loading animation
      )}
    </div>
  )
}

Home.propTypes = {
  storyIds: PropTypes.array,
  storiesFetchSuccess: PropTypes.bool,
  showMore: PropTypes.func,
  currentIndex: PropTypes.number,
}

export default Home
