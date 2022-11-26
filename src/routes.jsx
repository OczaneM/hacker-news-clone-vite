import { useRoutes } from "react-router-dom"
import { useSelector } from "react-redux"
import Home from "./pages/Home"
import AppLayout from "./layouts/appLayout"
import {
  getFetchStatusForAllStoryIds,
  getAllVisibleStoryIds,
  getAllSavedStories,
} from "./store/stories"

const Routes = () => {
  const storiesFetchSuccess =
    useSelector(getFetchStatusForAllStoryIds) === "fulfilled"
  const allStoryIds = useSelector(getAllVisibleStoryIds)
  const savedStoryIds = useSelector(getAllSavedStories)
  console.log({ allStoryIds, savedStoryIds })
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
            />
          ),
        },
        {
          path: "starred",
          element: (
            <Home
              storyIds={savedStoryIds}
              storiesFetchSuccess={storiesFetchSuccess}
            />
          ),
        },
      ],
    },
  ])

  return element
}

export default Routes
