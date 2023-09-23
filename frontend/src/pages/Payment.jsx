import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../components/MetaData'
import CheckoutSteps from '../components/CheckoutSteps'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Form } from '../components/Form';
import Button from '../components/Button';
import formatPrice from '../utils/formatPrice';
import { clearErrors, createOrder } from '../actions/orderAction'

function Payment() {
  const orderInfo = JSON.parse(
    sessionStorage.getItem('orderInfo')
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [disabled, setDisabled] = useState(false);

  const { shippingInfo, cartItems } = useSelector(
    state => state.cart
  );
  const { user } = useSelector(
    state => state.user
  );
  const { error } = useSelector(
    state => state.newOrder
  );

  const paymentData = {
    amount: Math.round(orderInfo.total * 100)
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };

  async function paymentSubmit(e) {
    e.preventDefault();
    setDisabled(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country
            }
          }
        }
      });
      if (result.error) {
        throw new Error(error);
      }
      if (result.paymentIntent.status === 'succeeded') {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status
        }
        dispatch(createOrder(order));
        navigate('/success');
      } else {
        alert("There's some issue while processing payment!");
      }
    } catch(error) {
      setDisabled(false);
      if (error instanceof Error)
        alert(error.message);
    }
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors())
    }
  }, [dispatch, error]);

  return (
    <>
      <MetaData title='Payment' />

      <CheckoutSteps activeStep={2} />
      <section className='py-8'>
        <div className='relative w-11/12 max-w-xl mx-auto'>
          <Form onSubmit={paymentSubmit}>
            <CardNumberElement
              className='px-3 py-2.5 border rounded-none focus-within:outline-blue-400'
            />
            <CardCvcElement
              className='px-3 py-2.5 border rounded-none focus-within:outline-blue-400'
            />
            <CardExpiryElement
              className='px-3 py-2.5 border rounded-none focus-within:outline-blue-400'
            />

            <Button
              type='submit'
              width='full'
              label={`Pay - ${orderInfo && formatPrice(orderInfo.total)}`}
              disabled={disabled}
            />
          </Form>
        </div>
      </section>
    </>
  )
}

export default Payment