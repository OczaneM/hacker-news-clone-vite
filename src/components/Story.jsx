import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { getStoryById, save, unsave } from "../store/stories"
import unsavedIcon from "../assets/star-regular.svg"
import savedIcon from "../assets/star-solid.svg"
import "./Story.scss"
import convertRelativeDays from "../utils/convertRelativeDays"

const Story = ({ storyId, index }) => {
  const [hostName, setHostName] = useState()
  const dispatch = useDispatch()

  // Story details destructured
  const { by, descendants, score, time, title, url, isSaved, localIndex } =
    useSelector((state) => getStoryById(state, storyId))
  const date = time && convertRelativeDays(time) // only converts to days. nees more acurate converter.

  // extract the story's source site name
  useEffect(() => {
    if (url && !hostName) setHostName(new URL(url).hostname)
  }, [url])

  const toggleSaveStory = () => {
    if (isSaved) dispatch(unsave(storyId))
    else dispatch(save(storyId))
  }

  return (
    <div>
      <div className="story-container">
        <div className="index-column">
          {/* localIndex belongs to saved stories. Saved and default stories have different index per page */}
          <span className="index">{localIndex || index}. </span>{" "}
        </div>
        <div className="content-column">
          <div className="heading">
            {/* when url comes undefined, redirects to root path */}
            <a href={url || ""} className="titlelink">
              {" "}
              {title}
            </a>{" "}
            <span className="source">({hostName || "unknown"})</span>{" "}
            {/* when url comes undefined, just display unknown */}
          </div>
          <div className="body">
            <span className="score">{score} points </span>
            <span className="by">by {by} </span>
            <span className="time">{date} | </span>
            <span className="numberofcomments">{descendants} comments | </span>
            <button
              className={`save-button ${isSaved && "-saved"}`}
              onClick={toggleSaveStory}
            >
              <img
                src={isSaved ? savedIcon : unsavedIcon}
                alt="Unsaved Story"
              />
              saved
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Story.propTypes = {
  storyId: PropTypes.number,
  index: PropTypes.number,
}

export default Story
