import React from 'react'
import RatingStars from './RatingStars'

function ReviewCard({ review }) {
  return (
    <div className='flex gap-6 items-start'>
      <img className='w-14 mt-1 aspect-square object-cover rounded-full' src="https://i.pravatar.cc/300" alt={review.name} />
      <div className='flex-1 bg-gray-200/75 p-5 relative before:content-[""] before:absolute before:top-4 before:-left-8 before:border-[1rem] before:border-transparent before:border-r-gray-200/75'>
        <cite className='not-italic font-bold font-accent leading-tight'>{review.name}</cite>
        <RatingStars
          rating={review.rating}
          className="flex gap-2 items-center"
        />
        <p className='mt-1'>{review.comment}</p>
      </div>
    </div>
  )
}

export default ReviewCard