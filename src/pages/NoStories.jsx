import React from "react"
import NoNewsIcon from "../assets/icons8-news.svg"
import "./NoStories.scss"

const NoStories = () => {
  return (
    <div className="no-stories">
      <img src={NoNewsIcon} />
      {"Can't find any news!"}
    </div>
  )
}

export default NoStories
