import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Story from "../components/Story"
import NoStories from "./NoStories"
import "./Home.scss"

const Home = ({ storyIds = [], storiesFetchSuccess, showMore }) => {
  if (storiesFetchSuccess && storyIds.length === 0) return <NoStories />
  const currentIndex = useSelector((state) => state.stories.currentIndex)

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
        <div>Loading</div>
      )}
    </div>
  )
}

Home.propTypes = {
  storyIds: PropTypes.array,
  storiesFetchSuccess: PropTypes.bool,
  showMore: PropTypes.func,
}

export default Home
