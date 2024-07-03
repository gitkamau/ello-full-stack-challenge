import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useForgotpasswordMutation } from './authApiSlice';
import "./assets/css/auth.css";


const ForgotPassword = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

  const [forgotPassword] = useForgotpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrMsg('Email is required');
      return;
    }

    try {
      setIsSubmitting(true);
      await forgotPassword({ email }).unwrap();
      setSuccessMsg('Password reset link sent. Please check your email.');
      setEmail('');
    } catch (err) {
      if (!err) {
        setErrMsg('No Server Response');
      } else if (err.status === 400 && err.data.email) {
        setErrMsg(err.data.email);
      } else {
        setErrMsg('Failed to send reset link');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Send Reset Link'}
        </button>
      </form>

      {errMsg && <p className="errMsg">{errMsg}</p>}
      {successMsg && <p className="successMsg">{successMsg}</p>}
    </div>
  );
};

export default ForgotPassword;
