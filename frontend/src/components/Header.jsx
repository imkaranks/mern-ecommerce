import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Avatar from '@mui/material/Avatar';
import UserOptions from './UserOptions';

function Header() {
  const [expanded, setExpanded] = useState(false);
  const { user, isAuthenticated } = useSelector(
    state => state.user
  );
  const { cartItems } = useSelector(
    state => state.cart
  );
  const activeLink = 'text-blue-400 before:content-[""] before:absolute before:left-0 before:right-0 before:-bottom-3 before:h-1 md:before:bg-blue-400';

  return (
    <header className='py-4'>
      <div className='w-11/12 max-w-7xl mx-auto flex gap-6 justify-between items-center'>
        <Link to='/' className='text-xl sm:text-2xl lg:text-3xl font-bold font-accent'>Ecomm</Link>

        <nav className={`fixed text-white font-accent z-40 top-0 bottom-0 left-0 w-4/5 transition-transform duration-300 ${expanded ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-auto bg-neutral-800 md:static md:bg-transparent md:text-black`}>
          <button className='absolute top-4 right-4 md:hidden' onClick={() => setExpanded(!expanded)}>
            <span className='sr-only'>Close</span>
            <CloseIcon />
          </button>
          <ul className='flex flex-col py-14 md:py-0 text-sm uppercase font-semibold md:flex-row'>
            <li className='py-2 border-b border-b-neutral-700 md:py-0 md:border-b-0'>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `relative p-4 ${isActive && activeLink}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className='py-2 border-b border-b-neutral-700 md:py-0 md:border-b-0'>
              <NavLink
                to='/products'
                className={({ isActive }) =>
                  `relative p-4 ${isActive && activeLink}`
                }
              >
                Products
              </NavLink>
            </li>
            <li className='py-2 border-b border-b-neutral-700 md:py-0 md:border-b-0'>
              <NavLink
                to='/search'
                className={({ isActive }) =>
                  `relative p-4 ${isActive && activeLink}`
                }
              >
                Search
              </NavLink>
            </li>
            <li className='py-2 border-b border-b-neutral-700 md:py-0 md:border-b-0'>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  `relative p-4 ${isActive && activeLink}`
                }
              >
                About
              </NavLink>
            </li>
            <li className='py-2 border-b border-b-neutral-700 md:py-0 md:border-b-0'>
              <NavLink
                to='/contact'
                className={({ isActive }) =>
                  `relative p-4 ${isActive && activeLink}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className='flex items-center gap-6'>
          <button className='md:hidden' onClick={() => setExpanded(!expanded)}>
            <span className='sr-only'>Menu</span>
            <MenuIcon />
          </button>
          {
            isAuthenticated && <UserOptions user={user} />
          }
          <Link to='/auth'>
            <span className='sr-only'>Profile</span>
            {
              user && user.avatar
              ? (
                user.avatar.url ?
                <Avatar
                  alt={user.name}
                  src={user.avatar.url}
                  sx={{ width: 30, height: 30 }}
                /> : <Avatar sx={{ width: 30, height: 30, fontSize: '0.85rem' }}>{user.name[0]}</Avatar>
              )
              : (
                <Avatar sx={{ width: 30, height: 30 }}>
                  <PersonIcon />
                </Avatar>
              )
            }
          </Link>
          <button>
            <span className='sr-only'>Wishlist</span>
            <FavoriteBorderIcon />
          </button>
          <Link to='/cart' className='relative'>
            <span className='sr-only'>Cart</span>
            {
              cartItems.length ? (
                <span className="absolute -top-1 -right-1 inline-grid place-items-center w-4 aspect-square bg-[#222] rounded-full text-[0.5rem] text-white">
                  {cartItems.length}
                </span>
              ) : null
            }
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;