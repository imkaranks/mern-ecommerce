import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productAction'
import Loader from '../components/Loader'
import RatingStars from '../components/RatingStars'
import ReviewCard from '../components/ReviewCard'
import MetaData from '../components/MetaData'

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    state => state.productDetails
  );
  const [isTruncated, setIsTruncated] = useState(true);

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title={`Ecommerce | ${product.name}`} />
        <div className='w-11/12 py-8 max-w-6xl mx-auto'>
          <div className='grid sm:grid-cols-2 gap-4'>
            <div className=''>
              <Carousel>
                {
                  product.images &&
                  product.images.map((image, i) => (
                    <img
                      key={i}
                      src={image.url}
                      className='w-full object-contain object-center'
                      alt={`image-${i}`}
                    />
                  ))
                }
              </Carousel>
            </div>
            <div className='flex-1 text-[#666]'>
              <div>
                <h2 className='text-[#333] text-3xl font-bold'>{product.name}</h2>
                <RatingStars
                  rating={product.rating}
                  numOfReviews={product.numOfReviews}
                  className="flex gap-2 items-center mt-1"
                />
                <hr className='w-10 mt-3' />
                <p className='font-bold mt-3 flex items-center gap-2 text-2xl'>
                  <del className='text-[#999]'>₹{product.price}</del>
                  <ins className='no-underline text-[#333]'>₹{product.price * 95 / 100}</ins>
                </p>

                {
                  product.desc && product.desc.length > 200 ? <>
                    <p className='md:text-lg mt-3'>{isTruncated ? product.desc.slice(0, 200) + '...' : product.desc}</p>
                    <button className='px-5 py-1.5 uppercase bg-[#eee] text-sm text-black font-medium' onClick={() => setIsTruncated(prev => !prev)}>
                      {isTruncated ? 'Read more' : 'Read less'}
                    </button>
                  </> : <p className='md:text-lg mt-3'>{product.desc}</p>
                }

                <p className='text-sm mt-4 uppercase'>
                  <span>Availability:</span>{' '}
                  <span className='text-[#333] font-bold'>{product.stock < 1 ? 'Out of Stock' : 'In Stock'}</span>
                </p>
                <p className='text-sm mt-1 uppercase'>
                  <span>Categories:</span>{' '}
                  <span className='text-[#333] font-bold'>com, featured, products, shop</span>
                </p>
                <hr className='mt-4' />
                <div className='flex flex-wrap items-center gap-2 my-4'>
                  <div className='flex w-full lg:w-auto'>
                    <button className='border text-[#333] px-0.5 py-1.5'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <span className='border-y text-lg font-semibold px-4 py-1.5'>1</span>
                    <button className='border text-[#333] px-0.5 py-1.5'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  <button className='px-5 py-1.5 uppercase bg-black text-lg text-white font-medium transition-colors duration-300 ease'>Add to cart</button>

                  <button className='border text-[#333] p-1.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>

                  <button className='border text-[#333] p-1.5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </button>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <h3 className='uppercase text-xl font-semibold'>Customer Reviews</h3>
            <RatingStars
              rating={product.rating}
              numOfReviews={product.numOfReviews}
              className="flex gap-2 items-center mt-1"
            />
            {
              product.reviews && product.reviews.length > 0 ? <div className='mt-3'>
                {
                  product.reviews.map((review, i) => <ReviewCard key={i} review={review} />)
                }
              </div> : <p className='text-lg text-[#666] font-semibold'>No Reviews Yet</p>
            }
          </div>
        </div>
      </>
  )
}

export default ProductDetails