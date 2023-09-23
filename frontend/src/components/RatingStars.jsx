import React from 'react'
import { Rating } from '@mui/material'

function RatingStars({ rating, numOfReviews, className }) {
  const options = {
    size: window.innerWidth < 600 ? 'large' : '',
    value: rating,
    precision: 0.5,
    readOnly: true
  }

  return (
    <div className={className || 'flex gap-2 items-center justify-center'}>
      <Rating {...options} />
      {numOfReviews !== undefined && <span className='text-xs text-[#888]'>{numOfReviews} {numOfReviews > 1 ? 'Reviews' : 'Review'}</span>}
    </div>
  )
}

export default RatingStars