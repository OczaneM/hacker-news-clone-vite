import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { rest } from "msw"
import { setupServer } from "msw/node"
import HomeContainer from "./HomeContainer"

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get("/api/user", (req, res, ctx) => {
    return res(ctx.json("John Smith"), ctx.delay(150))
  }),
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

describe("HomeContainer", () => {
  test("Displays a home page", () => {})
})
