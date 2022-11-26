import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseUrl = "https://hacker-news.firebaseio.com/v0/"
const newStoriesUrl = `${baseUrl}/newstories.json?limitToFirst=100&orderBy="$key"`
const storiesPerPage = 12

const getRequestsInBatch = async (ids) => {
  const batchRequests = ids.map((id) =>
    axios.get(`${baseUrl}/item/${id}.json?print=pretty`)
  )

  const storiesById = {}
  await axios
    .all(batchRequests)
    .then(
      axios.spread((...res) =>
        res.map(({ data }) => (storiesById[data.id] = data))
      )
    )

  return storiesById
}

export const getNewStories = createAsyncThunk(
  "stories/getNewStories",
  async () => {
    try {
      // ordered by date, descending
      const newStoriesRes = await axios
        .get(newStoriesUrl)
        .then((res) => res.data)

      const storiesById = await getRequestsInBatch(
        newStoriesRes.slice(0, storiesPerPage)
      )

      return { newStoriesRes, storiesById }
    } catch (error) {
      console.error(error)
    }
  }
)

export const getStoryBatch = createAsyncThunk(
  "stories/getStory",
  async (ids) => {
    try {
      const storiesById = getRequestsInBatch(ids)
      return storiesById
    } catch (error) {
      console.error(error)
    }
  }
)

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    allIds: [],
    byId: {},
    allIdsStatus: "pending",
    byIdFetchStatus: "pending",
    latestById: [],
    savedById: [],
    currentIndex: 0,
    currentSavedIndex: 0,
  },
  reducers: {
    save: (state, action) => {
      // payload = story id
      state.savedById.push(action.payload)
      state.byId[action.payload] = {
        ...state.byId[action.payload],
        isSaved: true,
        localIndex: state.allIds.indexOf(action.payload) + 1,
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
    showMore: (state, action) => {
      if (
        action.payload === "allStories" &&
        state.allIds.length > storiesPerPage
      ) {
        state.currentIndex += storiesPerPage
      } else if (
        action.payload === "savedStories" &&
        state.savedById.length > storiesPerPage
      ) {
        state.currentSavedIndex += storiesPerPage
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewStories.pending, (state) => {
        state.allIdsStatus = "pending"
      })
      .addCase(getNewStories.fulfilled, (state, action) => {
        state.allIds = action.payload.newStoriesRes
        state.byId = action.payload.storiesById
        state.allIdsStatus = "fulfilled"
      })
      .addCase(getNewStories.rejected, (state) => {
        state.allIdsStatus = "rejected"
      })

    builder
      .addCase(getStoryBatch.pending, (state) => {
        state.byIdFetchStatus = "pending"
      })
      .addCase(getStoryBatch.fulfilled, (state, action) => {
        state.byId = { ...state.byId, ...action.payload }
        state.byIdFetchStatus = "fulfilled"
      })
      .addCase(getStoryBatch.rejected, (state) => {
        state.byIdFetchStatus = "rejected"
      })
  },
})

export const getFetchStatusForAllStoryIds = (state) =>
  state.stories.allIdsStatus

export const getStoryById = (state, id) => state.stories.byId[id] || {}

export const getAllVisibleStoryIds = (state) =>
  state.stories.allIds.slice(
    state.stories.currentIndex,
    state.stories.currentIndex + storiesPerPage
  )

export const getAllSavedStories = (state) =>
  state.stories.savedById.slice(
    state.stories.currentSavedIndex,
    state.stories.currentSavedIndex + storiesPerPage
  )

// Action creators are generated for each case reducer function
export const { save, unsave, showMore } = storiesSlice.actions

export default storiesSlice.reducer
