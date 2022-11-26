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
    visible: [],
  },
  reducers: {
    save: (state, action) => {
      // payload = story id
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewStories.pending, (state) => {
        state.allIdsStatus = "pending"
      })
      .addCase(getNewStories.fulfilled, (state, action) => {
        state.allIds = action.payload
        state.visible = action.payload.slice(0, 12)
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
        state.byId[action.meta.arg].index =
          state.allIds.indexOf(action.meta.arg) + 1
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

export const getAllVisibleStoryIds = (state) => state.stories.visible

export const getAllSavedStories = (state) =>
  Object.values(state.stories.byId).filter((story) => story.isSaved)

// Action creators are generated for each case reducer function
export const { save, unsave } = storiesSlice.actions

export default storiesSlice.reducer
