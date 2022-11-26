import { combineReducers, configureStore } from "@reduxjs/toolkit"
import storiesReducer from "./store/stories"

const rootReducer = combineReducers({
  stories: storiesReducer,
})

export const setupStore = (preloadedState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}
