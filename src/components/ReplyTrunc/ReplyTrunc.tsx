import React from 'react'
import './ReplyTrunc.scss';

interface Props {
  depth: number
  count: number
  id: number
}

const Loader: React.FC<Props> = ({ depth, count, id }) => {
  return (
    <div 
      className="reply-trunc"
      style={{ marginLeft: `${depth * 20}px` }} 
    >
      <div 
        className="more-replies"
        onClick={() => console.log(`open replies for id ${id}`)}
      >
        {count === 1 ? '1 more reply' : `${count} more replies`}
      </div>
    </div>
  )
}

export default Loader