import React from 'react'
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';

function OrderSuccess() {
  return (
    <div className='text-center py-8'>
      <CheckCircleIcon sx={{ fontSize: '4rem' }} />

      <Typography variant='h5' component='h1'>Your order has been placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
}

export default OrderSuccess