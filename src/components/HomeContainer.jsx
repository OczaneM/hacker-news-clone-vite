import React from "react"
import { useSelector } from "react-redux"
import {
  getFetchStatusForAllStoryIds,
  getAllVisibleStoryIds,
} from "../store/stories"
import Home from "../pages/Home"

const HomeContainer = () => {
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "pending"
  const visibleStoryIds = useSelector(getAllVisibleStoryIds)

  return storiesFetchSuccess ? "Loading" : <Home storyIds={visibleStoryIds} />
}

export default HomeContainer
