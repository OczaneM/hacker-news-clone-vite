import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNewStories, getFetchStatusForAllStoryIds } from "./store/stories"
import Routes from "./routes"

// This is where app initialization occurs
// Renders routes
const App = () => {
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "fulfilled"
  const dispatch = useDispatch()

  useEffect(() => {
    if (!storiesFetchSuccess) dispatch(getNewStories())
  }, [])

  return <Routes />
}

export default App
