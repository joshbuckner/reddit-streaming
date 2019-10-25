import React from 'react'
import './Landing.scss'
import Thread from '../Thread/Thread'

const Landing = () => {
  return (
    <div className="landing">
      <section className="heading">
        <div className="heading__header">
          <div className="heading__heading">Reddit Streaming</div>
          {/* <div className="heading__body">Browse a live stream of comments from any thread on reddit</div> */}
        </div>
      </section>
      <section className="content">
        <div className="thread__container">
          <Thread scrollable={true} />
        </div>
        {/* <div className="content__container">
          <div className="content__tile">
            <div className="content__text">
              <div>Browse a live stream of comments from any thread on reddit</div>
              <div>Replace <span className="highlight">www.reddit.com</span> with <span className="highlight">www.reddit-streaming.com</span> in any comment thread</div>
            </div>
          </div>
          <div className="content__tile">
            <div></div>
          </div>
        </div> */}
      </section>
    </div>
  )
}

export default Landing