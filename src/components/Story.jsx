import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  getStory,
  getStoryById,
  getFetchStatusForStoryById,
} from "../store/stories"
import unsavedIcon from "../assets/star-regular.svg"
import "./Story.scss"

const StorySummary = ({ storyId, index, isSaved }) => {
  const [hostName, setHostName] = useState()
  const dispatch = useDispatch()
  const storyFetchSuccess =
    useSelector((state) => getFetchStatusForStoryById(state, storyId)) ===
    "fulfilled"
  const { by, descendants, score, time, title, url } = useSelector((state) =>
    getStoryById(state, storyId)
  )

  useEffect(() => {
    if (!storyFetchSuccess) dispatch(getStory(storyId))
  }, [])

  useEffect(() => {
    if (url && !hostName) setHostName(new URL(url).hostname)
  }, [url])

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
              <button className={`save-button ${isSaved && "-saved"}`}>
                <img src={unsavedIcon} alt="Unsaved Story" />
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

StorySummary.propTypes = {
  storyId: PropTypes.number,
  index: PropTypes.number,
  isSaved: PropTypes.bool,
}

export default StorySummary
