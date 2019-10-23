import React from 'react'
import './Comment.scss';
import Arrow from '../../assets/images/arrow.svg'

interface Props {
  id: number
  comment: string
  author: string
  created: number
  depth: number
  replies: any
}

const Comment: React.FC<Props> = ({ id, comment, author, created, depth, replies }) => {
  const htmlDecode = (input: any) => {
    const e = document.createElement('div')
    e.innerHTML = input
    if (!e.childNodes || e.childNodes.length === 0 || !e.childNodes[0].nodeValue) {
      return ""
    }
    return e.childNodes[0].nodeValue
  }

  return (
    <div>
      <div 
        className="comment" 
        style={{ marginBottom: depth === 0 ? '20px' : '0', marginTop: depth > 0 ? '10px' : '0' }}
      >
        <div className="comment__vote">
          <img 
            className="vote-up" 
            src={Arrow}
            alt="vote-up"
          />
          <img 
            className="vote-down" 
            src={Arrow} 
            alt="vote-down"
          /> 
          <div 
            className="comment__division"
          >
          </div>
        </div>
        <div className="comment__block">
          <div className="comment__content">
            <div 
              className="comment__header" 
              style={{justifyContent: depth > 0 ? 'flex-start' : ''}}
            >
              <a 
                className="comment__user" 
                href={`https://www.reddit.com/user/${author}`}
              >
                {author}
              </a>
              <div className="comment__timestamp" style={{marginLeft: depth > 0 ? '6px' : ''}}>
                {new Date(created*1000).toLocaleTimeString()}
              </div>
            </div>
            <div 
              className="comment__body" 
              dangerouslySetInnerHTML={{ __html: htmlDecode(comment) }}>
            </div>
            <div className="comment__footer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M14.45 19L12 22.5 9.55 19H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6.55z"/>
                </g>
              </svg>
              Reply
            </div>
          </div>
          {replies && replies.map((reply:any) => 
            <Comment 
              key={reply.data.id} 
              id={reply.data.id}
              comment={reply.data.body_html} 
              author={reply.data.author}
              created={reply.data.created_utc}
              depth={reply.data.depth}
              replies={reply.data.replies.data.children}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment