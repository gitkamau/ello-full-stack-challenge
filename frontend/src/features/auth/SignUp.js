import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useSignupMutation } from './authApiSlice';
import './assets/css/auth.css';

const SignUp = () => {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const verifyRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const errRef = useRef();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [verifyMsg, setVerifyMsg] = useState('');
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    
    const [signup, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();
    
    useEffect(() => {
        firstNameRef.current.focus();
    }, []);
    
    useEffect(() => {
        setErrMsg('');
    }, [first_name, last_name, email, password, re_password]);
    
    const handleSubmit = async (e) => {
        console.log("Submit Clicked")
        e.preventDefault();
        
        if (password !== re_password) {
            setErrMsg('Passwords do not match');
            return;
        }
        
        try {
            const result = await signup({ first_name, last_name, email, password, re_password }).unwrap();
            const userData = result.data;
            dispatch(setCredentials({ ...userData, email }));
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setIsSignUpSuccess(true);
            setVerifyMsg('Check your email to complete Sign Up.')
            if (verifyRef.current) {
                setTimeout(() => {
                    verifyRef.current.focus();
                }, 0);
            }
        } catch (err) {
            if (!err) {
                setErrMsg('No Server Response');
            } else if (err.status === 400 && err.data.email) {
                setErrMsg(err.data.email);
            } else if (err.status === 400 && err.data.password){
                setErrMsg(err.data.password);
            }else {
                setErrMsg('Signup Failed');
            }
            
            if (errRef.current) {
                setTimeout(() => {
                    errRef.current.focus();
                }, 0);
            }
        }
    };
    
    const handleFirstNameInput = (e) => setFirstName(e.target.value);
    const handleLastNameInput = (e) => setLastName(e.target.value);
    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

    
    return (
    <section>
        <div className="top">
            <h1>Sign Up</h1>
        </div>
        <div className="wrapper">
        {isSignUpSuccess ? (
            <p ref={verifyRef} className="verifyMsg">
                {verifyMsg}
            </p>
        ) : (
            <React.Fragment>
                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'}>
                    {errMsg}
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      id="first_name"
                      ref={firstNameRef}
                      value={first_name}
                      onChange={handleFirstNameInput}
                      autoComplete="off"
                      required
                      placeholder="First Name"
                      className="input"
                    />
                    <input
                      type="text"
                      id="last_name"
                      ref={lastNameRef}
                      value={last_name}
                      onChange={handleLastNameInput}
                      autoComplete="off"
                      required
                      placeholder="Last Name"
                      className="input"
                    />
                    <input
                      type="text"
                      id="email"
                      ref={emailRef}
                      value={email}
                      onChange={handleEmailInput}
                      autoComplete="off"
                      required
                      placeholder="Email"
                      className="input"
                    />
                    <input
                      type="password"
                      id="password"
                      ref={passwordRef}
                      value={password}
                      onChange={handlePasswordInput}
                      required
                      placeholder="Password"
                      className="input"
                    />
                    <input
                      type="password"
                      id="re_password"
                      ref={confirmPasswordRef}
                      value={re_password}
                      onChange={handleConfirmPasswordInput}
                      required
                      placeholder="Confirm Password"
                      className="input"
                    />
                    <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </React.Fragment>
        )}
        </div>
    </section>
  );
};

export default SignUp;
