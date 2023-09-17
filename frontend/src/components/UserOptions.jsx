import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../actions/userAction';

function UserOptions({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    {
      icon: <ListAltIcon />, name: 'Orders', onclick: orders
    },
    {
      icon: <PersonIcon />, name: 'Profile', onclick: account
    },
    {
      icon: <ShoppingBagOutlinedIcon />, name: 'Cart', onclick: viewCart
    },
    {
      icon: <ExitToAppIcon />, name: 'Logout', onclick: logoutUser
    }
  ];

  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      onclick: dashboard
    });
  }

  function dashboard() {
    navigate('/dashboard');
  }

  function orders() {
    navigate('/orders');
  }

  function viewCart() {
    navigate('/cart');
  }

  function account() {
    navigate('/account');
  }

  function logoutUser() {
    dispatch(logout());
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 38 }}
        open={open}
      />
      <SpeedDial
        ariaLabel='User Options'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        sx={{ position: 'fixed', zIndex: 39, bottom: 16, right: 16 }}
        icon={
          user.avatar.url
          ? <Avatar
              alt={user.name}
              src={user.avatar.url}
              sx={{ width: 40, height: 40 }}
            />
          : <Avatar sx={{ width: 40, height: 40 }}>{user.name[0]}</Avatar>
        }
      >
        {
          options.map((option, i) => (
            <SpeedDialAction
              key={i}
              icon={option.icon}
              tooltipTitle={option.name}
              onClick={option.onclick}
              tooltipOpen={window.innerWidth < 600}
            />
          ))
        }
      </SpeedDial>
    </>
  )
}

export default UserOptions