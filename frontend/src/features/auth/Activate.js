import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyMutation } from './authApiSlice';

const Activate = () => {
  const { uid, token } = useParams();
  const errRef = useRef();
  const [verified, setVerified] = useState(false);
  const [verify, { isLoading}] = useVerifyMutation();
  const navigate = useNavigate();

  const verifyAccount = async () => {
    try {
      await verify({ uid, token }).unwrap();
      setVerified(true);
      navigate('/login');
    } catch (err) {
      if (errRef.current) {
        setTimeout(() => {
          errRef.current.focus();
        }, 0);
      }
    }
  };

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ marginTop: '200px' }}
      >
        <h1>Verify your Account:</h1>
        {verified ? (
          <p>Your account has been successfully verified.</p>
        ) : (
          <button
            onClick={verifyAccount}
            style={{ marginTop: '50px' }}
            type="button"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Activate;
