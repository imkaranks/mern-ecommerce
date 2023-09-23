import React from 'react'
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';

function OrderSuccess() {
  return (
    <div className='bg-white max-w-lg mx-auto my-8 text-center py-8 px-4 space-y-3 sm:px-6 rounded-md shadow-lg shadow-black/20'>
      <CheckCircleIcon sx={{ fontSize: '4rem' }} color='success' />

      <Typography variant='h5' component='h1' sx={{ lineHeight: 1.1 }}>Your order has been placed successfully</Typography>
      <div className='flex flex-wrap justify-center gap-2'>
        <Link className='py-2 px-4 bg-[#f2f2f2] font-accent font-medium' to="/orders">View Orders</Link>
        <Link className='py-2 px-4 bg-[#333] text-white font-accent font-medium'  to="/">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default OrderSuccess