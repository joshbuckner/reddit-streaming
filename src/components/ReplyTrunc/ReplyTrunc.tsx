import React from 'react'
import './ReplyTrunc.scss';

interface Props {
  depth: number
}

const Loader: React.FC<Props> = ({ depth }) => {
  return (
    <div 
      className="reply-trunc"
      style={{
        marginLeft: `${depth * 20}px`, 
        
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
  )
}

export default Loader