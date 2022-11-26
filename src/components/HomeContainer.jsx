import React, { useState } from "react"
import { useSelector } from "react-redux"
import {
  getFetchStatusForAllStoryIds,
  getAllVisibleStoryIds,
  getAllSavedStories,
} from "../store/stories"
import Home from "../pages/Home"

const HomeContainer = () => {
  const [activeNav, setActiveNav] = useState("latest")
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "pending"
  const visibleStoryIds =
    activeNav === "starred"
      ? useSelector(getAllSavedStories)
      : useSelector(getAllVisibleStoryIds)

  return storiesFetchSuccess ? (
    "Loading"
  ) : (
    <Home
      storyIds={visibleStoryIds}
      activeNav={activeNav}
      setActiveNav={setActiveNav}
    />
  )
}

export default HomeContainer
