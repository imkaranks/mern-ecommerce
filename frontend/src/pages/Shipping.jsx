import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../actions/cartAction';
import MetaData from '../components/MetaData';
import { Country, State } from 'country-state-city';
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, FormGroup } from '../components/Form';
import Button from '../components/Button';
import Heading from '../components/Heading';

function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector(
    state => state.cart
  );

  const [address, setAddress] = useState(shippingInfo.address || '');
  const [city, setCity] = useState(shippingInfo.city || '');
  const [state, setState] = useState(shippingInfo.state || '');
  const [country, setCountry] = useState(shippingInfo.country || '');
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || '');
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || '');

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone number must be 10 digit!")
      return;
    }

    dispatch(saveShippingInfo({
      address,
      city,
      state,
      country,
      pinCode,
      phoneNo
    }));

    navigate('/order/confirm');
  }

  return (
    <>
      <MetaData title='Shipping Details' />

      <section className='text-center py-14 bg-[#f9f9f9]'>
        <div className='w-11/12 max-w-7xl mx-auto'>
          <Heading
            as='h1'
            variant='lg'
            label='Shipping Details'
          />
        </div>
      </section>

      <CheckoutSteps activeStep={0} />

      <section className='py-8'>
        <div className='relative w-11/12 max-w-xl mx-auto'>
          <Form onSubmit={shippingSubmit}>
            <FormGroup
              label='Address'
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormGroup
              label='City'
              type='text'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FormGroup
              as='select'
              label='Country'
              type='text'
              name='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" defaultValue={true}>---</option>
              {
                Country && Country.getAllCountries().map((item, i) => (
                  <option key={i} value={item.isoCode}>{item.name}</option>
                ))
              }
            </FormGroup>
            {
              country && (
                <FormGroup
                  as='select'
                  label='State'
                  name='state'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="" defaultValue={true}>---</option>
                  {
                    State && State.getStatesOfCountry(country).map((item, i) => (
                      <option key={i} value={item.isoCode}>{item.name}</option>
                    ))
                  }
                </FormGroup>
              )
            }
            <FormGroup
              label='Pin Code'
              type='number'
              name='pinCode'
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <FormGroup
              label='Phone Number'
              type='number'
              name='phoneNo'
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />

            <Button
              type='submit'
              label='Continue'
              width='full'
              disabled={state ? false : true}
            />
          </Form>
        </div>
      </section>
    </>
  );
}

export default Shipping;