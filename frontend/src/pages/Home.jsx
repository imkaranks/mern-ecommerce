import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../components/MetaData'
import Product from '../components/Product'
import { getProduct } from '../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    loading
    ? <Loader />
    : <>
      <MetaData title='Ecommerce | Home' />

      <div className='min-h-screen'>
        <section className='py-8'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <h2 className='text-center text-xl font-bold uppercase'>Shop by category</h2>
            <div className='text-center mt-6 grid gap-4 grid-cols-product'>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/product-20.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-semibold'>Accessories</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/product-89-2.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-semibold'>Bags</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/product-21.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-semibold'>Fashion</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/headphone-3.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-semibold'>Electronics</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/headphone-1.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-semibold'>Headphones</p>
              </div>
            </div>
          </div>
        </section>
        <section className='py-8'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <h2 className='text-center text-xl font-bold uppercase'>Featured Products</h2>
            <div className='grid mt-6 grid-cols-product gap-4'>
              {
                products && products.map(product => (
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