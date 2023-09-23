import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';

function Profile() {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector(
    state => state.user
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/auth');
    }
  }, [isAuthenticated]);

  return (
    loading
    ? <Loader />
    : <>
      <MetaData title={`Account | ${user.name}`} />
      <section className='text-center py-10 bg-[#f9f9f9]'>
        <div className='w-11/12 max-w-7xl mx-auto'>
          {
            user.avatar.url
            ? <Avatar
                alt={user.name}
                src={user.avatar.url}
                sx={{ width: 100, height: 100, marginInline: 'auto' }}
              />
            : <Avatar sx={{ width: 100, height: 100, marginInline: 'auto' }}>{user.name[0]}</Avatar>
          }
          <h1 className='text-3xl font-bold text-neutral-800 font-accent mt-2'>My Profile</h1>
        </div>
      </section>
      <div className='w-11/12 max-w-md mx-auto text-center py-8 flex flex-col gap-4'>
        <div>
          <h2 className='font-medium font-accent sm:text-lg leading-none'>Username</h2>
          <p>{user.name}</p>
        </div>
        <div>
          <h2 className='font-medium font-accent sm:text-lg leading-none'>Email address</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <h2 className='font-medium font-accent sm:text-lg leading-none'>Joined on</h2>
          <p>{String(user.createdAt).slice(0, 10)}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <Link to='/me/update' className='inline-flex justify-center px-6 py-2.5 bg-neutral-800 text-white font-semibold font-accent'>Edit Profile</Link>
          <Link className='px-6 py-2.5 inline-flex justify-center bg-neutral-800 text-white font-semibold font-accent'>My Orders</Link>
          <Link to='/password/update' className='px-6 py-2.5 inline-flex justify-center bg-neutral-800 text-white font-semibold font-accent'>Change Password</Link>
        </div>
      </div>
    </>
  )
}

export default Profile