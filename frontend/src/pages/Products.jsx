import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProduct } from '../actions/productAction'
import Loader from '../components/Loader'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import { Slider, Typography } from '@mui/material'
import MetaData from '../components/MetaData'

const categories = [
  'laptop',
  'footwear',
  'bottom',
  'top',
  'attire',
  'camera',
  'books',
  'smartphone'
]

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { products, loading, error, productCount, resultsPerPage, filteredProductCount } = useSelector(
    state => state.products
  );

  const { keyword } = useParams();

  const handlePageChange = (e, val) => {
    setCurrentPage(val);
  }

  const priceHandler = (e, val) => {
    setPrice(val);
  }

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating]);

  return (
    loading ? <Loader />
      : <>
        <MetaData title='Ecommerce | Products' />
        <div className='w-11/12 max-w-7xl mx-auto'>
          <h2 className='text-center text-3xl font-semibold'>Products</h2>
          <div className='grid mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
              products && products.map(product => (
                <Product key={product._id} {...product} />
              ))
            }
          </div>
          <div className='filter-box'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className='font-normal capitalize'>
              {
                categories.map((category, i) => (
                  <li
                    key={i}
                    className='p-2 cursor-pointer transition-colors hover:text-[tomato]'
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </li>
                ))
              }
            </ul>

            <fieldset>
              <Typography component='legend'>Rating Above</Typography>
              <Slider
                value={rating}
                onChange={(e, val) => {
                  setRating(val);
                }}
                valueLabelDisplay='auto'
                aria-labelledby='continuous-slider'
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {
            resultsPerPage < filteredProductCount && (
              <Paginate
                currentPage={currentPage}
                resultsPerPage={resultsPerPage}
                productCount={filteredProductCount}
                handlePageChange={handlePageChange}
              />
            )
          }
        </div>
      </>
  )
}

export default Products