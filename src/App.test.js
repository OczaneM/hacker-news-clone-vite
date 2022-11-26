import "@testing-library/jest-dom"
import React from "react"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProviders } from "./utils/testUtils"
import App from "./App"
import { act } from "react-dom/test-utils"

describe("App", () => {
  test("Displays a home page after succesfully fetching stories", async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        stories: { allIdsStatus: "fulfilled", allIds: [], savedById: [] },
      },
    })

    await act(() => {
      expect(screen.getAllByText("Hacker News")[0]).toBeVisible()
      expect(screen.getAllByText("latest")[0]).toBeVisible()
      expect(screen.getAllByText("starred")[0]).toBeVisible()
      expect(screen.getByText("Can't find any news!")).toBeVisible()
    })
  })

  test("Displays loading when fetching stories is not succesful", async () => {
    renderWithProviders(<App />, {
      preloadedState: {
        stories: { allIdsStatus: "pending", allIds: [], savedById: [] },
      },
    })

    await act(() => {
      expect(screen.getByText("Loading")).toBeVisible()
    })
  })

  test("Displays only starred stories when in starred view", () => {
    let sampleStories = {
      1: {
        by: "walterbell",
        descendants: 0,
        id: 33750598,
        score: 1,
        time: 1669446335,
        isSaved: false,
        localIndex: 0,
        title:
          "IRS warns taxpayers about new $600 threshold for third-party payment reporting",
        type: "story",
        url: "https://www.cnbc.com/2022/11/23/heres-why-you-may-get-form-1099-k-for-third-party-payments-in-2022.html",
      },
    }
    renderWithProviders(<App />, {
      preloadedState: {
        stories: {
          allIdsStatus: "fulfilled",
          allIds: [1],
          byId: sampleStories,
          statusById: "fulfilled",
          savedById: [],
          currentIndex: 0,
          currentSavedIndex: 0,
        },
      },
    })

    const starredButton = screen.getAllByText("starred")[0]
    userEvent.click(starredButton)
    expect(screen.getByText("Can't find any news!")).toBeVisible()
    expect(screen.queryByText("by walterbell")).not.toBeInTheDocument()

    userEvent.click(screen.getAllByText("latest")[0])
    expect(screen.queryByText("Can't find any news!")).not.toBeInTheDocument()
    expect(screen.getByText("by walterbell")).toBeVisible()

    userEvent.click(screen.getByText("saved"))
    userEvent.click(starredButton)
    expect(screen.queryByText("Can't find any news!")).not.toBeInTheDocument()
    expect(screen.getByText("by walterbell")).toBeVisible()
  })
})
