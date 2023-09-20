import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../actions/userAction';
import MetaData from '../components/MetaData';
import Loader from '../components/Loader';
import { Form, FormContainer, FormGroup } from '../components/Form';
import Button from '../components/Button';

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message } = useSelector(state => state.forgotPassword);

  const [email, setEmail] = useState('');

  function forgotPasswordSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  }

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert(message);
    }
  }, [dispatch, error, message]);

  return (
    loading
      ? <Loader />
      : <>
        <MetaData title='Forgot Password' />

        <FormContainer label='Forgot Password'>
          <Form
            onSubmit={forgotPasswordSubmit}
          >
            <FormGroup
              label='Email Address'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type='submit'
              label='Send'
              width='full'
              disabled={loading}
            />
          </Form>
        </FormContainer>
      </>
  );
}

export default ForgotPassword;