import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResetpasswordMutation } from './authApiSlice';
import "./assets/css/auth.css"

const ResetPassword = () => {
  const { uid, token } = useParams();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [new_password, setPassword] = useState('');
  const [re_new_password, setConfirmPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [resetPassword] = useResetpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!new_password || !re_new_password) {
      setErrMsg('Both password fields are required');
      return;
    }

    if (new_password !== re_new_password) {
      setErrMsg('Passwords do not match');
      return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword({ uid, token, new_password , re_new_password}).unwrap();
      setSuccessMsg('Password reset successfully. You can now log in with your new password.');
      setPassword('');
      setConfirmPassword('');
      navigate('/login')
    } catch (err) {
      if (!err) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Failed to reset password');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          value={new_password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="re_new_password"
          ref={confirmPasswordRef}
          value={re_new_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {errMsg && <p className="errMsg">{errMsg}</p>}
      {successMsg && <p className="successMsg">{successMsg}</p>}
    </div>
  );
};

export default ResetPassword;