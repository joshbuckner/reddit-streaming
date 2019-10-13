import React from 'react'
import './Comment.scss';
import Arrow from '../../assets/images/arrow.svg'

const Comment: React.FC = () => {
  return (
    <div className="comment">
      <div className="comment__vote">
        <img 
          className="vote-up" 
          src={Arrow} 
        />
        <img 
          className="vote-down" 
          src={Arrow} 
        />
        <div className="comment__division"></div>
      </div>
      <div className="comment__block">
        <div className="comment__header">
          <div className="comment__user">FisherKang</div>
          <div className="comment__timestamp">2:36pm</div>
        </div>
        <div className="comment__body">
          The amount of times "every voice matters" is repeated during their declaration doesnt really add with banning. The good thing, the banning produced such uproar that blizz is full on damage control.
        </div>
      </div>
    </div>
  )
}

export default Comment