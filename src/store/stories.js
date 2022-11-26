import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseUrl = "https://hacker-news.firebaseio.com/v0/"
const newStoriesUrl = `${baseUrl}/newstories.json`

export const getNewStories = createAsyncThunk(
  "stories/getNewStories",
  async () => {
    try {
      // ordered by date, descending
      const newStoriesRes = await axios
        .get(newStoriesUrl)
        .then((res) => res.data)
      return newStoriesRes
    } catch (error) {
      console.error(error)
    }
  }
)

export const getStory = createAsyncThunk("stories/getStory", async (id) => {
  try {
    const story = await axios
      .get(`${baseUrl}/item/${id}.json?print=pretty`)
      .then((res) => res.data)
    return story
  } catch (error) {
    console.error(error)
  }
})

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    allIds: [],
    byId: {},
    allIdsStatus: "pending",
    statusById: {},
    latestById: [],
    savedById: [],
    storiesPerPage: 12,
    currentIndex: 0,
  },
  reducers: {
    save: (state, action) => {
      // payload = story id
      state.savedById.push(action.payload)
      state.byId[action.payload] = {
        ...state.byId[action.payload],
        isSaved: true,
      }
    },
    unsave: (state, action) => {
      // payload = story id
      state.byId[action.payload] = {
        ...state.byId[action.payload],
        isSaved: false,
      }
      state.savedById = state.savedById.filter((id) => id !== action.payload)
    },
    showMore: (state) => {
      state.currentIndex += state.storiesPerPage
      state.latestById = state.allIds.slice(
        state.currentIndex,
        state.currentIndex + state.storiesPerPage
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewStories.pending, (state) => {
        state.allIdsStatus = "pending"
      })
      .addCase(getNewStories.fulfilled, (state, action) => {
        state.allIds = action.payload
        state.latestById = action.payload.slice(
          state.currentIndex,
          state.storiesPerPage
        )
        state.allIdsStatus = "fulfilled"
      })
      .addCase(getNewStories.rejected, (state) => {
        state.allIdsStatus = "rejected"
      })

    builder
      .addCase(getStory.pending, (state, action) => {
        state.statusById[action.meta.arg] = "pending"
      })
      .addCase(getStory.fulfilled, (state, action) => {
        state.byId[action.meta.arg] = action.payload
        state.statusById[action.meta.arg] = "fulfilled"
      })
      .addCase(getStory.rejected, (state, action) => {
        state.statusById[action.meta.arg] = "rejected"
      })
  },
})

export const getFetchStatusForAllStoryIds = (state) =>
  state.stories.allIdsStatus

export const getFetchStatusForStoryById = (state, id) =>
  state.stories.statusById[id] || "pending"

export const getStoryById = (state, id) => state.stories.byId[id] || {}

export const getAllVisibleStoryIds = (state) => state.stories.latestById

export const getAllSavedStories = (state) => state.stories.savedById

// Action creators are generated for each case reducer function
export const { save, unsave, showMore } = storiesSlice.actions

export default storiesSlice.reducer
