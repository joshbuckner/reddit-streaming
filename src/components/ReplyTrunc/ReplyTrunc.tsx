import React from 'react'
import './ReplyTrunc.scss';

interface Props {
  depth: number
  count: number
}

const Loader: React.FC<Props> = ({ depth, count }) => {
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
        {count === 1 ? '1 more reply' : `${count} more replies`}
      </a>
    </div>
  )
}

export default Loader