import React, { useEffect } from 'react';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getOrder } from '../actions/orderAction';
import { Link, useParams } from 'react-router-dom';
import CartItem from '../components/CartItem';
import formatPrice from '../utils/formatPrice';
import { colorVariants, buttonVariants } from '../components/Button';
import Heading from '../components/Heading';

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
                <Heading
                  as='h2'
                  variant='md'
                  label='Shipping info'
                  isUppercase={true}
                />
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
                <Heading
                  as='h2'
                  variant='md'
                  label={`Order #${params.id}`}
                  isUppercase={true}
                />
                <table className="w-full border-collapse text-sm max-sm:text-center">
                  <thead className="text-left uppercase max-sm:block max-sm:h-1 max-sm:overflow-hidden max-sm:bg-[#333] sm:border-b">
                    <tr className="max-sm:block">
                      <th className="sm:p-2" />
                      <th className="sm:p-2">
                        <Heading
                          as='span'
                          variant='sm'
                          label='Product'
                          isUppercase={true}
                        />
                      </th>
                      <th className="sm:p-2">
                        <Heading
                          as='span'
                          variant='sm'
                          label='Price'
                          isUppercase={true}
                        />
                      </th>
                      <th className="sm:p-2">
                        <Heading
                          as='span'
                          variant='sm'
                          label='Quantity'
                          isUppercase={true}
                        />
                      </th>
                      <th className="sm:p-2">
                        <Heading
                          as='span'
                          variant='sm'
                          label='Subtotal'
                          isUppercase={true}
                        />
                      </th>
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
              <Link className={`mt-6 ${buttonVariants['md']('fit', colorVariants['primary'])}`} to="/">Continue Shopping</Link>
            </div>
            <div className='[&_div+div]:border-t pt-4 md:p-6 md:flex-[0.6] md:max-w-sm md:border-2'>
              <Heading
                as='h2'
                variant='md'
                label='Order Summary'
                isUppercase={true}
              />
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