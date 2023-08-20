import React, { useEffect } from 'react'
import MetaData from '../components/MetaData'
import Header from '../components/Header'
import Product from '../components/Product'
import { getProduct } from '../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    loading
    ? <Loader />
    : <>
      <MetaData title='Ecommerce | Home' />

      <div className='bg-[#f9f9f9] min-h-screen'>
        <section>
          <div className='w-11/12 py-8 max-w-6xl mx-auto'>
            <h2 className='text-center text-3xl font-semibold'>Featured Products</h2>
            <div className='grid mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {
                products.map(product => (
                  <Product key={product._id} {...product} />
                ))
              }
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home