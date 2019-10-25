import React, { useEffect, useState, useRef } from 'react'
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

interface Props {
  scrollable: boolean
}

const Thread: React.FC<Props> = ({ scrollable }) => {
  const [comments, setComments] = useState<any>([])
  const [scrollLock, setScrollLock] = useState<any>(false)
  const { subreddit, threadID, threadSlug } :Params = useParams()
  const scrollableRef = useRef<HTMLDivElement>(null)

    // window.scrollTo(0, document.documentElement.scrollHeight)
    // setTimeout(() => {
    //   window.scrollTo(0, document.documentElement.scrollHeight)
    // }, 100)
    // setTimeout(() => {
    //   window.scrollTo({
    //     behavior: "smooth",
    //     top: document.documentElement.scrollHeight
    //   });
    // }, 1000);

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
        window.scrollTo(0, document.documentElement.scrollHeight)
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
      // if (scrollable && scrollableRef.current && scrollLock) {
      //   scrollableRef.current.scrollTo(0, scrollableRef.current.scrollHeight)
      // }
    }
  },[comments, scrollLock])

  useEffect(() => {
    const handleScroll = () => {
      // if (scrollableRef.current) {
      //   if (scrollableRef.current.scrollTop >= scrollableRef.current.scrollHeight - 745) {
      //     setScrollLock(true)
      //   } else {
      //     setScrollLock(false)
      //   }
      // }
      if (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
        setScrollLock(true)
      } else {
        setScrollLock(false)
      }
    }
    // if (scrollableRef.current) {
    //   scrollableRef.current.addEventListener('scroll', handleScroll)
    // }
    // return () => {
    //   if (scrollableRef.current) {
    //     scrollableRef.current.removeEventListener('scroll', handleScroll)
    //   }
    // }
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  },[])

  return (
    comments ? 
      <div 
        className="thread" 
        style={{  margin: scrollable ? '0 auto' : '50px auto'}}
        ref={scrollableRef}
      >
        {comments.map((comment:any, index:number) => 
          comment.kind !== 'more' ?
            <Comment 
              index={index}
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
