import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../components/MetaData';
import CartItem from '../components/CartItem';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import formatPrice from '../utils/formatPrice';
import Button from '../components/Button';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(
    state => state.cart
  );

  const checkoutHandler = () => {
    navigate('/auth?redirect=shipping');
  }

  return (
    <>
      <MetaData title='Your Cart' />

      <section className='text-center py-14 bg-[#f9f9f9]'>
        <div className='w-11/12 max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold text-neutral-800 font-accent'>Shopping Cart</h1>
        </div>
      </section>
      <div className={`mx-auto w-11/12 max-w-7xl py-8 ${cartItems.length ? 'flex flex-col md:flex-row gap-4' : ''}`}>
        {
          cartItems.length ? (
            <>
              <div className={`${cartItems.length ? 'md:flex-1' : ''}`}>
                <table className="w-full border-collapse text-sm max-sm:text-center">
                  <thead className="text-left uppercase max-sm:block max-sm:h-1 max-sm:overflow-hidden max-sm:bg-[#333] sm:border-b">
                    <tr className="max-sm:block">
                      <th className="sm:p-2" />
                      <th className="sm:p-2">Product</th>
                      <th className="sm:p-2">Price</th>
                      <th className="sm:p-2">Quantity</th>
                      <th className="sm:p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr]:border-b">
                    {
                      cartItems.map((cartItem, i) => (
                        <CartItem key={i} {...cartItem} />
                      ))
                    }
                  </tbody>
                </table>
                <Link to='/' className='inline-flex items-center justify-center bg-neutral-100 font-accent mt-4 px-8 py-3 uppercase font-bold text-sm text-[#333] transition-colors hover:bg-neutral-200'>Continue shopping</Link>
              </div>
              {
                cartItems.length && (
                  <div className='[&_div+div]:border-t md:flex-[0.5] md:max-w-sm border-2 p-4 lg:p-6'>
                    <h2 className='font-accent font-bold uppercase'>Cart Totals</h2>
                    <div className='text-sm py-2 flex justify-between items-center'>
                      <h3 className='font-accent font-semibold'>Subtotal</h3>
                      <p>
                        {
                          formatPrice(cartItems.reduce(
                            (total, item) => total + item.quantity * item.price
                          , 0))
                        }
                      </p>
                    </div>
                    <div className='text-sm py-2 flex justify-between items-center'>
                      <h3 className='font-accent font-semibold'>Total</h3>
                      <p className='font-bold text-lg'>
                        {
                          formatPrice(cartItems.reduce(
                            (total, item) => total + item.quantity * item.price
                            , 0))
                        }
                      </p>
                    </div>
                    <Button
                      label='Proceed to checkout'
                      width='full'
                      onClick={checkoutHandler}
                    />
                  </div>
                )
              }
            </>
          ) : (
            <div className='text-[#a3a3a3] flex flex-col gap-2 items-center'>
              <ShoppingBagOutlinedIcon sx={{ fontSize: '5rem' }} />
              <p className='text-center'>Your cart is currently empty.</p>
              <Link to='/products' className='inline-flex items-center justify-center bg-neutral-800 font-accent px-10 py-2.5 sm:py-4 uppercase font-bold text-white transition-colors hover:bg-neutral-700'>Return to shop</Link>
            </div>
          )
        }
      </div>
    </>
  );
}

export default Cart;