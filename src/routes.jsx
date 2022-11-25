import { useRoutes } from "react-router-dom"
import Home from "./components/HomeContainer"
import AppLayout from "./layouts/appLayout"

const Routes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ])

  return element
}

export default Routes
