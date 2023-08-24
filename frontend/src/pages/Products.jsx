import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProduct } from '../actions/productAction'
import Loader from '../components/Loader'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import { Slider, TextField, FormControlLabel, Checkbox } from '@mui/material'
import MetaData from '../components/MetaData'
import Dropdown from '../components/Dropdown'

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
        <div className='w-11/12 max-w-7xl mx-auto flex flex-col sm:flex-wrap gap-4 sm:flex-row'>

          <div className='border px-4 py-2 sm:flex-[0.5] sm:max-w-xs'>
            <Dropdown label='Price'>
              <div className='overflow-hidden px-4'>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={25000}
                />
                <div className='grid gap-2 grid-cols-2 -mx-2'>
                  <TextField
                    disabled
                    id="minimum"
                    label="Minimum"
                    defaultValue={price[0]}
                    size='small'
                  />
                  <TextField
                    disabled
                    id="maximum"
                    label="Maximum"
                    defaultValue={price[1]}
                    size='small'
                  />
                </div>
              </div>
            </Dropdown>

            <Dropdown label='Categories'>
              <ul className='text-gray-600 font-normal overflow-hidden capitalize'>
                {
                  categories.map((category, i) => (
                    <li
                      key={i}
                      className='px-4 py-1 cursor-pointer transition-colors duration-300 hover:rounded-full hover:bg-[whitesmoke]'
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))
                }
              </ul>
            </Dropdown>

            <Dropdown label='Rating Above'>
              <div className='px-4 overflow-hidden'>
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
              </div>
            </Dropdown>

            <Dropdown label='Availability'>
              <div className='overflow-hidden'>
                <FormControlLabel
                  label='In Stock'
                  control={
                    <Checkbox
                      inputProps={{ 'aria-label': 'In Stock' }}
                      defaultChecked
                      size='small'
                    />
                  }
                />
                <FormControlLabel
                  label='Out of Stock'
                  control={
                    <Checkbox
                      inputProps={{ 'aria-label': 'Out of Stock' }}
                      size='small'
                    />
                  }
                />
              </div>
            </Dropdown>
          </div>

          <div className='sm:flex-1 grid grid-cols-product gap-4'>
            <h2 className='mb-8 text-center text-xl font-bold uppercase col-span-full'>Products</h2>
            {
              products && products.map(product => (
                <Product key={product._id} {...product} />
              ))
            }
          </div>

          <div className='w-full'>
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
        </div>
      </>
  )
}

export default Products