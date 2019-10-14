import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Thread.scss';
import Comment from '../../components/Comment/Comment'

interface Params {
  subreddit?: string
  threadID?: string
  threadSlug?: string
}

var commentsList:any = []

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
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/get?subSlug=${subreddit}&threadID=${threadID}&threadSlug=${threadSlug}&commentID=${threadID}`)
        const json = await response.json();
        console.log("Data: ", json)
        setComments(json)
      } catch (error) {
        console.log("error: ", error)
      }
      return
    }
    getData()
  }, [subreddit, threadID, threadSlug])
  if (comments) {
    comments.data.children.forEach((comment:any) => getComments(comment))
  }
  return (
    comments ? 
      <div className="thread">
        {commentsList.map((comment:any, index:number) => 
          comment.kind !== 'more' 
            ? 
            <Comment 
              key={index} 
              comment={comment.data.body_html} 
              author={comment.data.author}
              created={comment.data.created_utc}
              depth={comment.data.depth}
            /> 
            :
            <div 
              key={index}
              style={{
                marginLeft: `${comment.data.depth * 20}px`, 
                marginBottom: '15px', 
                fontSize: '12px',
                fontFamily: 'IBMPlexSans, Arial, sans-serif',
                fontWeight: 'bold'
              }} 
            >
              <a 
                href={`reddit.com`}
                style={{
                  textDecoration: 'none',
                }}
              >
                1 more reply
              </a>
            </div>
        )}
      </div>
    : 
    <div className="loader">
      <div className="loader-inner pacman">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div><span className="tooltip">
        <p>pacman</p></span>
    </div>
  )
}

export default Thread
