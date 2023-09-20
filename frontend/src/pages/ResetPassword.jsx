import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../actions/userAction';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Form, FormContainer, FormGroup } from '../components/Form';
import Button from '../components/Button';

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector(state => state.forgotPassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(token, formData));
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Password updated successfully");
      navigate('/auth');
    }
  }, [dispatch, error, success]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Reset Password' />

        <FormContainer label='Reset Password'>
          <Form
            encType='multipart/form-data'
            onSubmit={resetPasswordSubmit}
          >
            <FormGroup
              label='New Password'
              type='password'
              name='new_password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              label='Update'
              width='full'
              disabled={loading}
            />
          </Form>
        </FormContainer>
      </>
  );
}

export default ResetPassword;