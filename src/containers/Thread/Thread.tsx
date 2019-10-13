import React from 'react'
import { useParams } from 'react-router-dom'
import './Thread.scss';
import Comment from '../../components/Comment/Comment'

interface Params {
  subreddit?: string
  commentid?: string
}

const getData = async (subSlug: any, commentID: any) => {
  try {
    const response = await fetch(`http://localhost:8080/get?subSlug=${subSlug}&commentID=${commentID}`)
    const json = await response.json();
    console.log("Data: ", json)
  } catch (error) {
    console.log("error: ", error)
  }
  return
}

const Thread: React.FC = () => {
  const { subreddit, commentid } :Params = useParams()
  getData(subreddit, commentid)
  return (
    <div className="thread">
      {/* <div>Now showing {commentid} from {subreddit}</div> */}
      <Comment/>
    </div>
  )
}

export default Thread
