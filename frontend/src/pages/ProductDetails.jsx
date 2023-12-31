import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { NEW_REVIEW_RESET } from '../constants/productConstant';
import { clearErrors, getProductDetails, createNewReview } from '../actions/productAction';
import { addItemToCart } from '../actions/cartAction';
import Carousel from 'react-material-ui-carousel';
import Loader from '../components/Loader';
import RatingStars from '../components/RatingStars';
import ReviewCard from '../components/ReviewCard';
import MetaData from '../components/MetaData';
import formatPrice from '../utils/formatPrice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import PrimaryBtn from '../components/Button';
import Heading from '../components/Heading';

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    state => state.productDetails
  );
  const { error: reviewError, success: reviewSuccess } = useSelector(
    state => state.newReview
  );
  const [isTruncated, setIsTruncated] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [open, setOpen] = useState(false);

  const reviewSubmitHandler = () => {
    const reviewFormData = new FormData();
    reviewFormData.set('rating', rating);
    reviewFormData.set('comment', review);
    reviewFormData.set('productId', id);
    dispatch(createNewReview(reviewFormData));
    setOpen(false);
  }

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    setQuantity(prev => prev + 1);
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(prev => prev - 1);
  }

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert('Added to cart 🥳');
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }
    if (reviewSuccess) {
      alert('Review submitted successfully 🥳');
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id))
  }, [dispatch, error, reviewError, reviewSuccess]);

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
                <Heading
                  as='h2'
                  variant='lg'
                  label={product.name}
                />
                <RatingStars
                  rating={product.rating}
                  numOfReviews={product.numOfReviews}
                  className="flex gap-2 items-center mt-1"
                />
                <hr className='w-10 mt-3' />
                <p className='font-bold mt-3 flex items-center gap-2 text-2xl'>
                  <del className='text-[#999]'>
                    {formatPrice(product.price)}
                  </del>
                  <ins className='no-underline text-[#333]'>
                    {formatPrice(product.price * 95 / 100)}
                  </ins>
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
                    <button className='border text-[#333] p-1.5' onClick={decreaseQuantity}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <span className='border-y text-black text-lg font-semibold px-4 py-1.5'>{quantity}</span>
                    <button className='border text-[#333] p-1.5' onClick={increaseQuantity}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  <PrimaryBtn
                    type='button'
                    label='Add to cart'
                    size='md'
                    variant='primary'
                    disabled={product.stock < 1}
                    onClick={addToCartHandler}
                  />

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
            <Heading
              as='h3'
              variant='md'
              label='Customer Reviews'
              isUppercase={true}
            />
            <div>
              <Button variant="outlined" onClick={() => setOpen(true)}>
                Submit Review
              </Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent>
                  <Rating
                    onChange={(e) => setRating(+e.target.value)}
                    value={rating}
                    size='large'
                    precision={0.5}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="review"
                    label="Review"
                    fullWidth
                    variant="standard"
                    multiline
                    rows={4}
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={reviewSubmitHandler}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
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