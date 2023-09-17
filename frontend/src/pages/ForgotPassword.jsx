import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../actions/userAction';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message } = useSelector(state => state.forgotPassword);

  const [email, setEmail] = useState('');

  function forgotPasswordSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert(message);
    }
  }, [dispatch, error, message]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Forgot Password' />
        <section className='text-center py-14 bg-[#f9f9f9]'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-neutral-800 font-accent'>Forgot Password</h1>
          </div>
        </section>
        <section className='py-8'>
          <div className='relative w-11/12 max-w-xl mx-auto'>
            <form
              className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300'
              onSubmit={forgotPasswordSubmit}
            >
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="email">Email Address</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
                disabled={loading}
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </>
  );
}

export default ForgotPassword;