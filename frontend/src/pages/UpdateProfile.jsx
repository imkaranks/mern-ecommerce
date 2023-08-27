import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../actions/userAction';
import { Avatar } from '@mui/material';
import { UPDATE_PROFILE_RESET } from '../constants/userConstant';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { error, loading, isUpdated } = useSelector(state => state.profile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('');

  const profileDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const userProfileSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('avatar', avatar);
    dispatch(updateProfile(formData));
  }

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert('Profile updated sucessfully!');
      dispatch(loadUser());
      navigate('/account');
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, user, isUpdated]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Update Profile' />
        <section className='text-center py-14 bg-[#f9f9f9]'>
          <div className='w-11/12 max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold text-neutral-800 font-accent'>Update Profile</h1>
          </div>
        </section>
        <section className='py-8'>
          <div className='relative w-11/12 max-w-xl mx-auto'>
            <form
              className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300'
              encType='multipart/form-data'
              onSubmit={userProfileSubmit}
            >
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="update-name">Username</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="text"
                  name="name"
                  id="update-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-neutral-600' htmlFor="update-email">Email Address</label>
                <input
                  className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="email"
                  name="email"
                  id="update-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex items-center gap-2'>
                <label className='text-neutral-600' htmlFor="avatar">
                  {
                    avatarPreview
                      ? <Avatar
                        alt={name}
                        src={avatarPreview}
                        sx={{ width: 48, height: 48 }}
                      />
                      : <Avatar sx={{ width: 48, height: 48 }}>{name[0]}</Avatar>
                  }
                </label>
                <input
                  className='flex-1 px-3 py-2.5 border rounded-none focus:outline-blue-400'
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={profileDataChange}
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
  )
}

export default UpdateProfile;