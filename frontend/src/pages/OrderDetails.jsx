import React, { useEffect } from 'react'
import MetaData from '../components/MetaData'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrder } from '../actions/orderAction'
import { Link, useParams } from 'react-router-dom';
import CartItem from '../components/CartItem';
import formatPrice from '../utils/formatPrice';

function OrderDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector(
    state => state.user
  );
  const { loading, error, order } = useSelector(
    state => state.orderDetails
  );

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrder(params.id));
  }, [dispatch, params, error]);

  return (
    loading
      ? <Loader />
      : (
        Object.keys(order).length && <>
          <MetaData title={`Order Details`} />

          <div className='mx-auto w-11/12 max-w-7xl py-8 flex flex-col gap-4 md:flex-row'>
            <div className='md:flex-1 space-y-6'>
              <div className='[&_div+div]:border-t text-sm'>
                <h2 className='font-accent text-lg uppercase font-semibold'>Shipping info</h2>
                <div className='py-1 flex items-center gap-4'>
                  <h3 className='flex-[0.3] max-w-[10ch] font-semibold'>Name:</h3>
                  <p className='flex-1'>{user.name}</p>
                </div>
                <div className='py-1 flex items-center gap-4'>
                  <h3 className='flex-[0.3] max-w-[10ch] font-semibold'>Phone:</h3>
                  <p className='flex-1'>{order.shippingInfo.phoneNo}</p>
                </div>
                <div className='py-1 flex items-center gap-4'>
                  <h3 className='flex-[0.3] max-w-[10ch] font-semibold'>Address:</h3>
                  <p className='flex-1'>{`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</p>
                </div>
              </div>
              <div>
                <h2 className='font-accent text-lg uppercase font-semibold'>Order #{params.id}</h2>
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
                      order.orderItems.map((orderItem, i) => (
                        <CartItem
                          key={i}
                          {...orderItem}
                          readonly={true}
                        />
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <Link className='mt-6 inline-flex py-2 px-4 bg-[#333] text-white font-accent font-medium uppercase'  to="/">Continue Shopping</Link>
            </div>
            <div className='[&_div+div]:border-t pt-4 md:p-6 md:flex-[0.6] md:max-w-sm md:border-2'>
              <h2 className='font-accent font-semibold text-lg'>Order Summary</h2>
              <div className='py-2 text-sm flex items-center justify-between'>
                <h3 className='font-accent font-medium'>Subtotal:</h3>
                <p>{formatPrice(order.totalPrice)}</p>
              </div>
              <div className='py-2 text-sm flex items-center justify-between'>
                <h3 className='font-accent font-medium'>Shipping Charges:</h3>
                <p>{formatPrice(order.shippingPrice)}</p>
              </div>
              <div className='py-2 text-sm flex items-center justify-between'>
                <h3 className='font-accent font-medium'>GST:</h3>
                <p>{formatPrice(order.taxPrice)}</p>
              </div>
              <div className='py-2 flex items-center justify-between'>
                <h3 className='font-accent font-medium'>Total:</h3>
                <p className='text-lg font-bold'>{formatPrice(order.totalPrice)}</p>
              </div>
            </div>
          </div>
        </>
      )
  )
}

export default OrderDetails