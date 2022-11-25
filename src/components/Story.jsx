import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import {
  getStory,
  getStoryById,
  getFetchStatusForStoryById,
} from "../store/stories"

const StorySummary = ({ storyId, index, isSaved }) => {
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

  return (
    <div>
      {storyFetchSuccess ? (
        <div className="story-container">
          <div className="heading">
            {index}.{" "}
            <a href={url} className="titlelink">
              {title}
            </a>{" "}
            <span className="source">({url})</span>
          </div>
          <div className="body">
            <span className="score">{score} points </span>
            <span className="by">by {by} </span>
            <span className="time">{time} | </span>
            <span className="numberofcomments">{descendants} comments | </span>
            <button className={`savebutton ${isSaved && "-saved"}`}></button>
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
