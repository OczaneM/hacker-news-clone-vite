import "@testing-library/jest-dom"
import React from "react"
import { screen } from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { renderWithProviders } from "../utils/testUtils"
import HomeContainer from "./HomeContainer"

const storyIds = [1, 2, 3]
// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get(
    "https://hacker-news.firebaseio.com/v0/newstories.json",
    (req, res, ctx) => {
      return res(storyIds, ctx.delay(150))
    }
  ),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("HomeContainer", () => {
  test("Displays a home page after succesfully fetching stories", async () => {
    renderWithProviders(<HomeContainer />, {
      preloadedState: { stories: { allIdsStatus: "fulfilled" } },
    })

    expect(screen.getAllByText("Hacker News")[0]).toBeVisible()
  })
})
