import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../actions/userAction';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector(state => state.forgotPassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(token, formData));
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Password updated successfully");
      navigate('/auth');
    }
  }, [dispatch, error, success]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Reset Password' />
        <section className='text-center py-14 bg-[#f9f9f9]'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-neutral-800 font-accent'>Reset Password</h1>
          </div>
        </section>
        <section className='py-8'>
          <div className='relative w-11/12 max-w-xl mx-auto'>
            <form
              className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300'
              encType='multipart/form-data'
              onSubmit={resetPasswordSubmit}
            >
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="password">New Password</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="confirm-password">Confirm Password</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />
              </div>
              <button
                type='submit'
                className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
                disabled={loading}
              >
                Update
              </button>
            </form>
          </div>
        </section>
      </>
  );
}

export default ResetPassword;