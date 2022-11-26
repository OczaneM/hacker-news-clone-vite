import React, { useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Home from "./pages/Home"
import AppLayout from "./layouts/appLayout"
import {
  getFetchStatusForAllStoryIds,
  getAllVisibleStoryIds,
  getAllSavedStories,
  getStoryBatch,
  showMore,
} from "./store/stories"

// Handles top-level routing
// Tracks "show more" event and fetches new batches of stories
// Helps keep Home dumb by fetching its needed data
const Routes = () => {
  const dispatch = useDispatch()
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "fulfilled"
  const visibleStoryIds = useSelector(getAllVisibleStoryIds)
  const savedStoryIds = useSelector(getAllSavedStories)
  const currentIndex = useSelector((state) => state.stories.currentIndex) // updates when "show more" fires

  useEffect(() => {
    dispatch(getStoryBatch(visibleStoryIds))
  }, [currentIndex])

  let element = useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <Home
              storyIds={visibleStoryIds}
              storiesFetchSuccess={storiesFetchSuccess}
              showMore={() => dispatch(showMore("allStories"))}
              currentIndex={currentIndex}
            />
          ),
        },
        {
          path: "starred",
          element: (
            <Home
              storyIds={savedStoryIds}
              storiesFetchSuccess={storiesFetchSuccess}
              showMore={() => dispatch(showMore("savedStories"))}
              currentIndex={currentIndex}
            />
          ),
        },
      ],
    },
  ])

  return element
}

export default Routes
