import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../actions/userAction';
import Loader from '../components/Loader';

function UserAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPasswd, setLoginPasswd] = useState('');

  const [avatar, setAvatar] = useState('/user_placeholder.png');
  const [avatarPreview, setAvatarPreview] = useState('/user_placeholder.png');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = user;

  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const switchTabs = (e, tab) => {
    e.preventDefault();
    if (tab === "login") {
      if (registerTab.current.classList.contains('-translate-x-full')) {
        registerTab.current.classList.remove('-translate-x-full');
      }
      loginTab.current.classList.replace('-translate-x-[100vw]', 'translate-x-0');
      registerTab.current.classList.add('translate-x-full');
    }
    if (tab === "register") {
      if (loginTab.current.classList.contains('translate-x-0')) {
        loginTab.current.classList.remove('translate-x-0');
      }
      registerTab.current.classList.replace('translate-x-full', '-translate-x-full');
      loginTab.current.classList.add('-translate-x-[100vw]');
    }
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPasswd));
  }

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
    }
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('password', password);
    formData.set('avatar', avatar);
    dispatch(register(formData));
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    loading
    ? <Loader />
    : <>
      <section className='text-center py-14 bg-[#f9f9f9]'>
        <div className='w-11/12 max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold text-neutral-800 font-accent'>My Account</h1>
        </div>
      </section>

      <section className='py-8'>
        <div className='relative w-11/12 max-w-xl mx-auto flex overflow-hidden'>
          {/* <h2 className='text-neutral-800 font-accent text-xl font-bold'>Login</h2> */}

          <form
            className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300'
            ref={loginTab}
            encType='multipart/form-data'
            onSubmit={loginSubmit}
          >
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="login-email">Email Address</label>
              <input
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="email"
                name="email"
                id="login-email"
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="login-password">Password</label>
              <input
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="password"
                name="password"
                id="login-password"
                value={loginPasswd}
                onChange={(e) =>
                  setLoginPasswd(e.target.value)
                }
              />
            </div>
            <div>
              <Link className='text-sm text-neutral-600 font-semibold' to='/'>Forgot your password?</Link>
            </div>
            <button
              type='submit'
              className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
              disabled={loading}
            >
              Log in
            </button>
            <button
              type='button'
              className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
              onClick={(e) => switchTabs(e, "register")}
            >
              Create an account
            </button>
          </form>

          <form
            className='w-full flex-shrink-0 mt-3 space-y-4 transition-transform duration-300 translate-x-full'
            ref={registerTab}
            encType='multipart/form-data'
            onSubmit={registerSubmit}
          >
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="register-name">Username</label>
              <input
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="text"
                name="name"
                id="register-name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="register-email">Email Address</label>
              <input
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="email"
                name="email"
                id="register-email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-neutral-600' htmlFor="register-password">Password</label>
              <input
                className='px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="password"
                name="password"
                id="register-password"
                value={password}
                onChange={registerDataChange}
              />
            </div>
            <div className='flex items-center gap-2'>
              <label className='text-neutral-600' htmlFor="avatar">
                <img
                  className='w-10 sm:w-12 aspect-square rounded-full object-cover object-center'
                  src={avatarPreview}
                  alt="Avatar Preview"
                />
              </label>
              <input
                className='flex-1 px-3 py-2.5 border rounded-none focus:outline-blue-400'
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <div>
              <Link className='text-sm text-neutral-600 font-semibold' to='/'>Forgot your password?</Link>
            </div>
            <button
              type='submit'
              className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
              disabled={loading}
            >
              Register
            </button>
            <button
              type='button'
              className='inline-flex items-center justify-center bg-neutral-900 font-accent px-4 py-2.5 sm:py-4 w-full uppercase font-bold text-white transition-colors hover:bg-neutral-700'
              onClick={(e) => switchTabs(e, "login")}
            >
              Login account
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default UserAuth