import React from "react"
import './NoFound.scss';

/**
 * Component NoFound where display text not information
 * @constant
 * @type {function}
 * @returns {JSX}
 */
const NoFound = () => {

  return (
    <div className="ui-search-not-found">
      <i className="fal fa-exclamation-circle"></i>
      <span>Not finding what you’re looking for? Try searching another term.</span>
    </div>
  )
}

export default NoFound