import React from 'react'
import './Landing.scss'
import Thread from '../Thread/Thread'

const Landing = () => {
  return (
    <div className="landing">
      <section className="heading">
        <div className="heading__header">
          <div className="heading__heading">Reddit Streaming</div>
          <div className="heading__body">Browse a live stream of comments from any thread on reddit</div>
        </div>
      </section>
      <section className="content">
        <div className="thread__container">
          <Thread scrollable={true} />
        </div>
        <div className="content__container">
          <div className="content__instructions">
            <div className="content__step">
              <div>Replace <span className="highlight">www.reddit.com</span> with <span className="highlight">www.reddit-streaming.com</span> in any reddit comment thread</div>
            </div>
            {/* <div className="content__button" onClick={()=> window.location.assign('/r/leagueoflegends/comments/dk6zta/fnatic_vs_royal_never_give_up_2019_world/')}>Try it out</div> */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing