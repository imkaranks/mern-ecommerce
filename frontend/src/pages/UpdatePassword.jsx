import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../constants/userConstant';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Form, FormContainer, FormGroup } from '../components/Form';
import Button from '../components/Button';

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

        <FormContainer
          label='Change Password'
        >
          <Form
            encType='multipart/form-data'
            onSubmit={userPasswordSubmit}
          >
            <FormGroup
              label='Old Password'
              type='password'
              name='old_password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <FormGroup
              label='New Password'
              type='password'
              name='new_password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormGroup
              label='Confirm Password'
              type='password'
              name='confirm_password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type='submit'
              label='Change'
              width='full'
              disabled={loading}
            />
          </Form>
        </FormContainer>
      </>
  );
}

export default UpdatePassword;