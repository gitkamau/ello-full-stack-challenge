import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import "./assets/css/auth.css"


const LogIn = () => {
    const errRef = useRef()
    const emailRef = useRef() 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setErrMsg('');
        }, 0);
    }, [ email, password])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const userData = await login({ email, password}).unwrap() 
            dispatch(setCredentials({...userData, email}))
            setEmail('')
            setPassword('')
            navigate('/home')
        } catch (err) {
            if(!err){
                setErrMsg('No Server Response')
            } else if (err.status === 401){
                setErrMsg(err.data.detail);
            } else {
                setErrMsg('Login Failed')
            }
            if (errRef.current) {
                setTimeout(() => {
                    errRef.current.focus();
                }, 0);
            }
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)

    return (
        <section>
            <div className="top">
                <h1>Sign In</h1>
                <Link to="/signup" className="signup">
                    Sign Up
                </Link>
            </div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                <p ref={errRef} className={ errMsg ? "errMsg" : "offscreen"}>
                    {errMsg}
                </p>
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
                      onChange={handlePasswordInput}
                      value={password}
                      required
                      placeholder="Password"
                    />
                    {isLoading ? (
                        <h4>Loading ...</h4>
                    ) : (
                        <button type="submit">Sign In</button>
                    )}

                   <Link to="/forgot-password">Forgot Password?</Link>
                </form>
            </div>
        </section>
    )
};

export default LogIn
