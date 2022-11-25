import { configureStore } from "@reduxjs/toolkit"
import storiesReducer from "./store/stories"

export default configureStore({
  reducer: {
    stories: storiesReducer,
  },
})
