import React from "react"
import { useRoutes } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Home from "./pages/Home"
import AppLayout from "./layouts/appLayout"
import {
  getFetchStatusForAllStoryIds,
  getAllVisibleStoryIds,
  getAllSavedStories,
  showMore,
} from "./store/stories"

const Routes = () => {
  const dispatch = useDispatch()
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "fulfilled"
  const allStoryIds = useSelector(getAllVisibleStoryIds)
  const savedStoryIds = useSelector(getAllSavedStories)

  const showMoreStories = () => dispatch(showMore())

  let element = useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <Home
              storyIds={allStoryIds}
              storiesFetchSuccess={storiesFetchSuccess}
              showMore={showMoreStories}
            />
          ),
        },
        {
          path: "starred",
          element: (
            <Home
              storyIds={savedStoryIds}
              storiesFetchSuccess={storiesFetchSuccess}
              showMore={showMoreStories}
            />
          ),
        },
      ],
    },
  ])

  return element
}

export default Routes
