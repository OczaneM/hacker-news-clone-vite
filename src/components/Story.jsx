import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  getStory,
  getStoryById,
  getFetchStatusForStoryById,
  save,
  unsave,
} from "../store/stories"
import unsavedIcon from "../assets/star-regular.svg"
import savedIcon from "../assets/star-solid.svg"
import "./Story.scss"

const Story = ({ storyId }) => {
  const [hostName, setHostName] = useState()
  const dispatch = useDispatch()
  const storyFetchSuccess =
    useSelector((state) => getFetchStatusForStoryById(state, storyId)) ===
    "fulfilled"
  const { by, descendants, score, time, title, url, index, isSaved } =
    useSelector((state) => getStoryById(state, storyId))

  useEffect(() => {
    if (!storyFetchSuccess) dispatch(getStory(storyId))
  }, [])

  useEffect(() => {
    if (url && !hostName) setHostName(new URL(url).hostname)
  }, [url])

  const toggleSaveStory = () => {
    if (isSaved) dispatch(unsave(storyId))
    else dispatch(save(storyId))
  }

  return (
    <div>
      {storyFetchSuccess ? (
        <div className="story-container">
          <div className="index-column">
            <span className="index">{index}. </span>
          </div>
          <div className="content-column">
            <div className="heading">
              <a href={url} className="titlelink">
                {title}
              </a>{" "}
              <span className="source">({hostName})</span>
            </div>
            <div className="body">
              <span className="score">{score} points </span>
              <span className="by">by {by} </span>
              <span className="time">{time} | </span>
              <span className="numberofcomments">
                {descendants} comments |{" "}
              </span>
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
      ) : (
        "loading story"
      )}
    </div>
  )
}

Story.propTypes = {
  storyId: PropTypes.number,
}

export default Story
