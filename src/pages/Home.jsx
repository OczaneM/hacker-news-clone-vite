import React from "react"
import { useSelector } from "react-redux"
import Story from "../components/Story"
import {
  getFetchStatusForAllStoryIds,
  getAllVisibleStoryIds,
} from "../store/stories"
import SavedToggle from "../components/SavedToggle"
import "./Home.scss"

const Home = () => {
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "pending"
  const visibleStoryIds = useSelector(getAllVisibleStoryIds)

  return storiesFetchSuccess ? (
    "Loading"
  ) : (
    <div className="home-page">
      <div className="heading">
        <div className="y-icon">Y</div>
        <div className="title">Hacker News</div>
        <SavedToggle />
      </div>
      <div className="body">
        {visibleStoryIds.map((storyId, index) => {
          return <Story key={storyId} storyId={storyId} index={index + 1} />
        })}
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default Home
