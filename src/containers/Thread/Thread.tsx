import React from 'react'
import { useParams } from 'react-router-dom'
import './Thread.scss';
import Comment from '../../components/Comment/Comment'
interface Params {
  subreddit?: string
  commentid?: string
}

const Thread: React.FC = () => {
  const { subreddit, commentid } :Params = useParams()

  return (
    <div className="thread">
      {/* <div>Now showing {commentid} from {subreddit}</div> */}
      <Comment/>
    </div>
  )
}

export default Thread
