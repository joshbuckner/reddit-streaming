import React from 'react'
import './Comment.scss';
import Arrow from '../../assets/images/arrow.svg'

interface Props {
  comment: string
  author: string
  created: number
  depth: number
}

const Comment: React.FC<Props> = ({ comment, author, created, depth }) => {
  const htmlDecode = (input: any) => {
    const e = document.createElement('div')
    e.innerHTML = input
    if (!e.childNodes || e.childNodes.length === 0 || !e.childNodes[0].nodeValue) {
      return ""
    }
    return e.childNodes[0].nodeValue
  }
  return (
    <div className="comment" style={{ marginLeft: `${depth * 20}px` }}>
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
        <div className="comment__division"></div>
      </div>
      <div className="comment__block">
        <div className="comment__header">
          <a className="comment__user" href={`https://www.reddit.com/user/${author}`}>{author}</a>
          <div className="comment__timestamp">{new Date(created*1000).toLocaleTimeString()}</div>
        </div>
        <div 
          className="comment__body" 
          dangerouslySetInnerHTML={{ __html: htmlDecode(comment) }}>
        </div>
      </div>
    </div>
  )
}

export default Comment