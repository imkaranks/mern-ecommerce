import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../constants/userConstant';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isUpdated } = useSelector(state => state.profile);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('newPassword', newPassword);
    formData.set('confirmPassword', confirmPassword);
    dispatch(updatePassword(formData));
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert('Password updated sucessfully!');
      navigate('/account');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, isUpdated]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Change Password' />
        <section className='text-center py-14 bg-[#f9f9f9]'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-neutral-800 font-accent'>Change Password</h1>
          </div>
        </section>
        <section className='py-8'>
          <div className='relative w-11/12 max-w-xl mx-auto'>
            <form
              className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300'
              encType='multipart/form-data'
              onSubmit={userPasswordSubmit}
            >
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="login-password">Old Password</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="password"
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(e.target.value)
                  }
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="login-password">New Password</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  required
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="login-password">Confirm Password</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="password"
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
                Change
              </button>
            </form>
          </div>
        </section>
      </>
  );
}

export default UpdatePassword;