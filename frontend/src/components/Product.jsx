import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../actions/cartAction';
import RatingStars from './RatingStars';
import formatPrice from '../utils/formatPrice';
import Button from './Button';

function Product({ _id, name, images, numOfReviews, price, rating, category }) {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.stopPropagation();
    dispatch(addItemToCart(_id, 1));
    alert('Added to cart 🥳');
  }

  return (
    <article className='text-center transition-all duration-300 cursor-pointer ease group hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] hover:bg-white'>
      <div className='aspect-square relative overflow-hidden'>
        <Link to={`/product/${_id}`}>
          <img className='w-full h-full object-cover transition-transform duration-300 ease group-hover:scale-110' src={images[0].url} alt="..." />
        </Link>
        <Button
          type='button'
          label='Quick view'
          size='sm'
          colorConfig={{ bg: 'blue-600', color: 'white' }}
          className='text-white transition-transform absolute left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0 focus:translate-y-0 z-10'
        />
      </div>
      <div className='px-4 pb-4 pt-2'>
        <span className='text-[#888] text-xs uppercase font-light'>{category}</span>
        <h3 className='text-sm font-normal leading-none'>
          <Link to={`/product/${_id}`}>{name}</Link>
        </h3>
        <p className='mt-1 font-semibold text-base'>
          {formatPrice(price)}
        </p>

        <RatingStars
          rating={rating}
          numOfReviews={numOfReviews}
        />

        <div className='flex justify-center items-center gap-1 mt-1'>
          <button className='border text-[#333] p-1.5 translate-x-full opacity-0 transition-transform duration-300 ease group-hover:translate-x-0 group-hover:opacity-100 focus:translate-x-0 focus:opacity-100'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          <Button
            type='button'
            label='Add to cart'
            size='sm'
            variant='secondary'
            onClick={addToCartHandler}
            className='group-hover:bg-black group-hover:text-white'
          />

          <button className='border text-[#333] p-1.5 -translate-x-full opacity-0 transition-transform duration-300 ease group-hover:translate-x-0 group-hover:opacity-100 focus:translate-x-0 focus:opacity-100'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default Product