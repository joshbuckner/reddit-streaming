import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Thread.scss';
import Comment from '../../components/Comment/Comment'
import Loader from '../../components/Loader/Loader'
import ReplyTrunc from '../../components/ReplyTrunc/ReplyTrunc'

const socket = new WebSocket('ws://localhost:8080/ws')

interface Params {
  subreddit?: string
  threadID?: string
  threadSlug?: string
}

const Thread: React.FC = () => {
  const [comments, setComments] = useState<any>([])
  const [scrollLock, setScrollLock] = useState<any>(false)
  const { subreddit, threadID, threadSlug } :Params = useParams()

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({subSlug: subreddit, threadID: threadID, threadSlug: threadSlug, commentID: threadID}))
    }
    return () => {
      socket.close()
    }
  },[subreddit, threadID, threadSlug])

  useEffect(() => {
    socket.onmessage = (event) => {
      const newComments = JSON.parse(event.data).data.children
      const commentsMerged = [...comments]

      const searchOldComments = (oldComment: any, newComment: any) => {
        if (!oldComment) {
          return
        }
        if (oldComment.data.id === newComment.data.id) {
          // continue here and set new comment
          console.log('comment already exists')
        }
        if (oldComment.data.replies.data.children) {
          oldComment.data.replies.data.children.forEach((reply:any) => searchOldComments(reply, newComment))
        }
        return
      }

      const traverseComments = (newComment: any) => {
        comments.forEach((oldComment: any) => {
          searchOldComments(oldComment, newComment)
        })
      }

      const searchNewComments = (comment: any) => {
        if (!comment) {
          return
        }
        traverseComments(comment)
        if (comment.data.replies.data.children) {
          comment.data.replies.data.children.forEach((reply:any) => searchNewComments(reply))
        }
        return
      }

      if (comments.length === 0) {
        console.log('no comments')
        setComments(newComments)
      } else {
        setComments(newComments)
        // newComments.forEach((comment: any) => {
        //   searchNewComments(comment)
        // })
      }

      // console.log(JSON.parse(event.data).data.children)
      // setComments(JSON.parse(event.data).data.children)
      // const newComments = JSON.parse(event.data)
      // const commentsList:any = []
      // const commentsMerged = [...comments]

      // const getComments = (comment:any) => {
      //   if (!comment) {
      //     return
      //   }
      //   commentsList.push(comment)
      //   if (comment.data.replies.data.children) {
      //     comment.data.replies.data.children.forEach((reply:any) => getComments(reply))
      //   }
      //   return
      // }

      // if (newComments) {
      //   newComments.data.children.forEach((comment:any) => getComments(comment))
      // }

      // commentsList.forEach((comment:any) => {
      //   const i = commentsMerged.findIndex((commentCompare) => {
      //     return commentCompare.data.id === comment.data.id
      //   })
      //   if (i === -1) {
      //     if (comment.data.depth !== 0) {
      //       const parentIndex = commentsMerged.findIndex((parent) => {
      //         return comment.data.parent_id.includes(parent.data.id)
      //       })
      //       commentsMerged.splice(parentIndex+1, 0, comment)
      //     } else {
      //       commentsMerged.push(comment)
      //     }
      //   } else {
      //     commentsMerged[i] = comment
      //   }
      // })
      // setComments(commentsMerged)
       
      if (scrollLock) {
        window.scrollTo(0, document.documentElement.scrollHeight)
      }
    }
  },[comments, scrollLock])

  useEffect(() => {
    const handleScroll = () => {
      // console.log('handle scroll', document.documentElement.scrollTop, document.documentElement.scrollHeight - 979)
      if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - 979) {
        setScrollLock(true)
      } else {
        setScrollLock(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  return (
    comments ? 
      <div className="thread">
        {comments.map((comment:any) => 
          comment.kind !== 'more' ?
            <Comment 
              key={comment.data.id} 
              id={comment.data.id}
              comment={comment.data.body_html} 
              author={comment.data.author}
              created={comment.data.created_utc}
              depth={comment.data.depth}
              replies={comment.data.replies.data.children}
            /> 
          :
          <ReplyTrunc 
            key={comment.data.id} 
            id={comment.data.id}
            parentID={comment.data.parent_id}
            depth={comment.data.depth}
            count={comment.data.count}
          />
        )}
      </div>
    : 
    <Loader/>
  )
}

export default Thread
