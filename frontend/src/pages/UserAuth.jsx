import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../actions/userAction';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Form, FormContainer, FormGroup } from '../components/Form';
import Button from '../components/Button';

function UserAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const redirect = location.search ? '/' + location.search.split('=')[1] : '/account';

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Ecommerce | Authentication' />
        <FormContainer
          multiple={true}
          label='My Account'
        >
          {/* Sign in */}
          <Form
            forwardedRef={loginTab}
            encType='multipart/form-data'
            onSubmit={loginSubmit}
          >
            <FormGroup
              label='Email Address'
              type='email'
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <FormGroup
              label='Password'
              type='password'
              value={loginPasswd}
              onChange={(e) => setLoginPasswd(e.target.value)}
            />

            <div>
              <Link className='text-sm text-neutral-600 font-semibold' to='/password/forgot'>Forgot your password?</Link>
            </div>

            <Button
              type='submit'
              label='Log in'
              width='full'
              disabled={loading}
            />
            <Button
              label='Create an account'
              width='full'
              onClick={(e) => switchTabs(e, 'register')}
            />
          </Form>

          {/* Sign up */}
          <Form
            className='translate-x-full'
            forwardedRef={registerTab}
            encType='multipart/form-data'
            onSubmit={registerSubmit}
          >
            <FormGroup
              label='Username'
              type='text'
              name='name'
              value={name}
              onChange={registerDataChange}
            />
            <FormGroup
              label='Email Address'
              type='email'
              name='email'
              value={email}
              onChange={registerDataChange}
            />
            <FormGroup
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={registerDataChange}
            />

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

            <Button
              type='submit'
              label='Register'
              width='full'
              disabled={loading}
            />
            <Button
              label='Login Account'
              width='full'
              onClick={(e) => switchTabs(e, 'login')}
            />
          </Form>
        </FormContainer>
      </>
  )
}

export default UserAuth