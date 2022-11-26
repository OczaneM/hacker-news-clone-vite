import "@testing-library/jest-dom"
import React from "react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "./utils/testUtils"
import App from "./App"

const stories = {
  1: {
    by: "walterbell",
    descendants: 0,
    id: 33750598,
    score: 1,
    time: 1669446335,
    isSaved: false,
    title:
      "IRS warns taxpayers about new $600 threshold for third-party payment reporting",
    type: "story",
    url: "https://www.cnbc.com/2022/11/23/heres-why-you-may-get-form-1099-k-for-third-party-payments-in-2022.html",
  },
}

describe("App", () => {
  test("Displays a home page after succesfully fetching stories", async () => {
    renderWithProviders(<App />, {
      preloadedState: { stories: { allIdsStatus: "fulfilled" } },
    })

    expect(screen.getAllByText("Hacker News")[0]).toBeVisible()
    expect(screen.getAllByText("latest")[0]).toBeVisible()
    expect(screen.getAllByText("starred")[0]).toBeVisible()
  })

  test("Displays loading when fetching stories is not succesful", () => {
    renderWithProviders(<App />, {
      preloadedState: { stories: { allIdsStatus: "pending" } },
    })

    expect(screen.getByText("Loading")).toBeVisible()
  })

  test("Displays no news views when there are no stories", () => {
    renderWithProviders(<App />, {
      preloadedState: { stories: { allIdsStatus: "fulfilled", allIds: [] } },
    })

    expect(screen.getByText("Can't find any news!")).toBeVisible()
  })

  test.only("Displays only starred stories when in starred view", () => {
    renderWithProviders(<App />, {
      preloadedState: {
        stories: {
          allIdsStatus: "fulfilled",
          latestById: [1],
          byId: stories,
          statusById: { 1: "fulfilled" },
          savedById: [],
        },
      },
    })

    userEvent.click(screen.getAllByText("starred")[0])
    expect(screen.getByText("Can't find any news!")).toBeVisible()
    expect(screen.queryByText("by walterbell")).not.toBeInTheDocument()

    userEvent.click(screen.getAllByText("latest")[0])
    expect(screen.queryByText("Can't find any news!")).not.toBeInTheDocument()
    expect(screen.getByText("by walterbell")).toBeVisible()

    userEvent.click(screen.getByText("saved"))
    userEvent.click(screen.getAllByText("starred")[0])
    expect(screen.queryByText("Can't find any news!")).not.toBeInTheDocument()
    expect(screen.getByText("by walterbell")).toBeVisible()
  })
})
