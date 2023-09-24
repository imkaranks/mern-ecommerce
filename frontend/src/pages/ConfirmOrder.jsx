import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../components/MetaData'
import CheckoutSteps from '../components/CheckoutSteps';
import CartItem from '../components/CartItem';
import formatPrice from '../utils/formatPrice';
import Button from '../components/Button';
import Heading from '../components/Heading';

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector(
    state => state.cart
  );
  const { user } = useSelector(
    state => state.user
  );

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price
  , 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const total = subtotal + tax + shippingCharges;

  const proceedPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      total
    }

    sessionStorage.setItem(
      'orderInfo', JSON.stringify(data)
    );

    navigate('/payment/process');
  }

  return (
    <>
      <MetaData title='Confirm Order' />

      <CheckoutSteps activeStep={1} />

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
              <p className='flex-1'>{shippingInfo.phoneNo}</p>
            </div>
            <div className='py-1 flex items-center gap-4'>
              <h3 className='flex-[0.3] max-w-[10ch] font-semibold'>Address:</h3>
              <p className='flex-1'>{address}</p>
            </div>
          </div>
          <div>
            <Heading
              as='h2'
              variant='md'
              label='Your Cart Items'
              isUppercase={true}
            />
            {
              cartItems.length && (
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
                      cartItems.map((cartItem, i) => (
                        <CartItem
                          key={i}
                          {...cartItem}
                          readonly={true}
                        />
                      ))
                    }
                  </tbody>
                </table>
              )
            }
          </div>
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
            <p>{formatPrice(subtotal)}</p>
          </div>
          <div className='py-2 text-sm flex items-center justify-between'>
            <h3 className='font-accent font-medium'>Shipping Charges:</h3>
            <p>{formatPrice(shippingCharges)}</p>
          </div>
          <div className='py-2 text-sm flex items-center justify-between'>
            <h3 className='font-accent font-medium'>GST:</h3>
            <p>{formatPrice(tax)}</p>
          </div>
          <div className='py-2 flex items-center justify-between'>
            <h3 className='font-accent font-medium'>Total:</h3>
            <p className='text-lg font-bold'>{formatPrice(total)}</p>
          </div>

          <Button
            label='Proceed to pay'
            width='full'
            onClick={proceedPayment}
          />
        </div>
      </div >
    </>
  )
}

export default ConfirmOrder