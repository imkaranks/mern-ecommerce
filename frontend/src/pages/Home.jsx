import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../components/MetaData';
import Product from '../components/Product';
import { clearErrors, getProduct } from '../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Heading from '../components/Heading';

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    loading
    ? <Loader />
    : <>
      <MetaData title='Ecommerce | Home' />

      <div className='min-h-screen'>
        <section className='py-8'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <Heading
              as='h2'
              variant='md'
              label='Shop by category'
              style={{ textAlign: 'center' }}
              isUppercase={true}
            />
            <div className='text-center mt-6 grid gap-4 grid-cols-product text-neutral-800'>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/product-20.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-bold'>Accessories</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/product-89-2.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-bold'>Bags</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/product-21.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-bold'>Fashion</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/headphone-3.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-bold'>Electronics</p>
              </div>
              <div>
                <Link to='/products'>
                  <img className='w-full aspect-square object-cover object-center' src="https://cdn.shopify.com/s/files/1/1613/0103/files/headphone-1.jpg?v=1598330080" alt="" />
                </Link>
                <p className='mt-2 text-base uppercase font-bold'>Headphones</p>
              </div>
            </div>
          </div>
        </section>
        <section className='py-8'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <Heading
              as='h2'
              variant='md'
              label='Featured Products'
              style={{ textAlign: 'center' }}
              isUppercase={true}
            />
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
  );
}

export default Home;