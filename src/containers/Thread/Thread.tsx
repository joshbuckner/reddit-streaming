import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Thread.scss';
import Comment from '../../components/Comment/Comment'
import Loader from '../../components/Loader/Loader'
import ReplyTrunc from '../../components/ReplyTrunc/ReplyTrunc'

interface Params {
  subreddit?: string
  threadID?: string
  threadSlug?: string
}

let commentsList:any = []

const getComments = (comment:any) => {
  if (!comment) {
    return
  }
  commentsList.push(comment)
  if (comment.data.replies.data.children) {
    comment.data.replies.data.children.forEach((reply:any) => getComments(reply))
  }
  return
}

const Thread: React.FC = () => {
  const [comments, setComments] = useState()
  const { subreddit, threadID, threadSlug } :Params = useParams()
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws')
    socket.onopen = () => {
      socket.send(JSON.stringify({subSlug: subreddit, threadID: threadID, threadSlug: threadSlug, commentID: threadID}))
    }
    socket.onmessage = (event) => {
      // setComments(JSON.parse(event.data))
      setComments((prevComments:any) => {
        return {...prevComments, ...JSON.parse(event.data)}
      })
    }
    return () => {
      socket.close()
    }
  },[subreddit, threadID, threadSlug])

  if (comments) {
    comments.data.children.forEach((comment:any) => getComments(comment))
  }

  return (
    comments ? 
      <div className="thread">
        {commentsList.map((comment:any, index:number) => 
          comment.kind !== 'more' ?
            <Comment 
              key={index} 
              comment={comment.data.body_html} 
              author={comment.data.author}
              created={comment.data.created_utc}
              depth={comment.data.depth}
            /> 
          :
          <ReplyTrunc 
            key={index} 
            depth={comment.data.depth}
          />
        )}
      </div>
    : 
    <Loader/>
  )
}

export default Thread
