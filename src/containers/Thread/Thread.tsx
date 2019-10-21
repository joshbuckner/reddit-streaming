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



let scrollPosition = 0


const Thread: React.FC = () => {
  const [comments, setComments] = useState<any>([])
  const { subreddit, threadID, threadSlug } :Params = useParams()

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws')
    socket.onopen = () => {
      socket.send(JSON.stringify({subSlug: subreddit, threadID: threadID, threadSlug: threadSlug, commentID: threadID}))
    }
    socket.onmessage = (event) => {

      const newComments = JSON.parse(event.data)
      const commentsList:any = []

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

      if (newComments) {
        newComments.data.children.forEach((comment:any) => getComments(comment))
      }

      // setComments((prevComments:any) => {
      //   return {...prevComments, ...commentsList}
      // })

      setComments([...commentsList, ...comments])

      console.log(comments)

      // setComments(commentsMerged)

      console.log('message recieved')
      console.log(scrollPosition)
      
      let { scrollTop, scrollHeight } = document.documentElement
      scrollTop = scrollTop >= scrollHeight ? scrollHeight : scrollPosition
    }
    return () => {
      socket.close()
    }
  },[subreddit, threadID, threadSlug])

  useEffect(() => {
    const handleScroll = () => {
      console.log(document.documentElement.scrollTop)
      let { scrollTop } = document.documentElement
      scrollPosition = scrollTop
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  return (
    comments ? 
      <div className="thread">
        {comments.map((comment:any, index:number) => 
          comment.kind !== 'more' ?
            <Comment 
              key={comment.data.id} 
              comment={comment.data.body_html} 
              author={comment.data.author}
              created={comment.data.created_utc}
              depth={comment.data.depth}
            /> 
          :
          <ReplyTrunc 
            key={comment.data.id} 
            depth={comment.data.depth}
          />
        )}
      </div>
    : 
    <Loader/>
  )
}

export default Thread
