import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../actions/cartAction'
import MetaData from '../components/MetaData'
import { Country, State } from 'country-state-city'
import CheckoutSteps from '../components/CheckoutSteps';

function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector(
    state => state.cart
  );

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

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
          <h1 className='text-3xl font-bold text-neutral-800 font-accent'>Shipping Details</h1>
        </div>
      </section>

      <CheckoutSteps activeStep={0} />

      <section className='py-8'>
        <div className='relative w-11/12 max-w-xl mx-auto'>
          <form
            className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300'
            onSubmit={shippingSubmit}
          >
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="address">Address</label>
              <input
                required
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="city">City</label>
              <input
                required
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="country">Country</label>
              <select
                required
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                name="country"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" selected>--</option>
                {
                  Country && Country.getAllCountries().map((item, i) => (
                    <option key={i} value={item.isoCode}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            {
              country && (
                <div className='flex flex-col gap-1'>
                  <label className='text-neutral-600' htmlFor="state">State</label>
                  <select
                    required
                    className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                    name="state"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" selected>--</option>
                    {
                      State && State.getStatesOfCountry(country).map((item, i) => (
                        <option key={i} value={item.isoCode}>{item.name}</option>
                      ))
                    }
                  </select>
                </div>
              )
            }
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="pinCode">Pin Code</label>
              <input
                required
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="number"
                name="pinCode"
                id="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="phoneNo">Phone Number</label>
              <input
                required
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="number"
                name="phoneNo"
                id="phoneNo"
                value={phoneNo}
                size="10"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
              disabled={state ? false : true}
            >
              Continue
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Shipping