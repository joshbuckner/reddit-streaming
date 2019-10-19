import React from 'react'
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="tooltip">
        <p>pacman</p>
      </span>
    </div>
  )
}

export default Loader