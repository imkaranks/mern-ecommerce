import React from 'react'
import ReactStars from 'react-rating-stars-component'

function RatingStars({ rating, numOfReviews, className }) {
  const options = {
    edit: false,
    color: '#aaa',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 15 : 20,
    value: rating,
    isHalf: true
  }

  return (
    <div className={className || 'flex gap-2 items-center justify-center'}>
      <ReactStars {...options} />
      {numOfReviews && <span className='text-xs text-[#888]'>{numOfReviews} Review{numOfReviews > 1 && 's'}</span>}
    </div>
  )
}

export default RatingStars