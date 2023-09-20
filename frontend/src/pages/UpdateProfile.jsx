import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from '../actions/userAction';
import { Avatar } from '@mui/material';
import { UPDATE_PROFILE_RESET } from '../constants/userConstant';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Form, FormContainer, FormGroup } from '../components/Form';
import Button from '../components/Button';

function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    state => state.user
  );
  const { error, loading, isUpdated } = useSelector(
    state => state.profile
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
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

        <FormContainer
          label='Update Profile'
        >
          <Form
            encType='multipart/form-data'
            onSubmit={userProfileSubmit}
          >
            <FormGroup
              label='Username'
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormGroup
              label='Email Address'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <Button
              type='submit'
              label='Update'
              width='full'
              disabled={loading}
            />
          </Form>
        </FormContainer>
      </>
  )
}

export default UpdateProfile;