import React from 'react'
import './Home.scss'
import Thread from '../Thread/Thread'

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home__header">
          <div className="home__heading">Reddit Streaming</div>
          <div className="home__body">Browse a live stream of comments from any thread on reddit</div>
        </div>
        <div className="home__instructions">
          <div className="home__step">
            <div><span className="highlight">(1)</span> Navigate to the comments section of any post on reddit</div>
            <img 
              width="240" 
              height="180" 
              src="https://media.giphy.com/media/89Eko49m84Ja/giphy.gif"
              alt="gif1"
            />
          </div>
          <div className="home__step">
            <div><span className="highlight">(2)</span> Replace <span className="highlight">www.reddit.com</span> with <span className="highlight">www.reddit-streaming.com</span> in your web browser's url</div>
            <img 
              width="240" 
              height="180" 
              src="https://media.giphy.com/media/n9vTEP11fGREY/giphy.gif"
              alt="gif2"
            />
          </div>
          <div className="home__step">
            <div><span className="highlight">(3)</span> Watch new comments appear in real time!</div>
            <img 
              width="240" 
              height="180" 
              src="https://media.giphy.com/media/RFgSqGzbbYZk4/giphy.gif"
              alt="gif3"
            />
          </div>
          <div className="home__button" onClick={()=> window.location.assign('/r/leagueoflegends/comments/dk6zta/fnatic_vs_royal_never_give_up_2019_world/')}>Try it out</div>
        </div>
        <div className="footer">footer content goes here like &copy; with links etc</div>
      </div>
    {/* <div style={{ width: '40vw', position: 'absolute', top: '0', right: '20px', perspective: '1000px', transform: 'scale(.8)'}}>
      <div style={{  maxHeight: '1000px', overflow: 'hidden', transform: 'rotateY(-20deg) rotateX(10deg)'}}>
        <Thread/>
      </div>
    </div> */}
    </>
  )
}

export default Home