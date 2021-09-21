import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../lib/contexts/AuthContext';
import * as Icon from 'react-feather'
import { auth, db } from '../../../lib/config/firebaseConfig';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AuthScreen from './../../../components/Screens/AuthScreen/';
import Spacer from '../../../components/Utilities/Spacer';
import Input from '../../../components/Utilities/Input';
import '../style.css'
import Button from '../../../components/Utilities/Button';


const Login = () => {
    const { currentUser, login, signInWithGoogle, loading, setLoading, setShowAlert } = useAuthContext()
    const { loadingStatus } = loading
    // useState for toggling showPwd icon
    const [showPwd, setShowPwd] = useState(false)
    const history = useHistory()
    // useStates for inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Sign in with email and password
    const handleSignInWithPwd = (e) => {
        e.preventDefault()
        // Check if all inputs are filled
        if (email.length > 0 && password.length > 0) {
            setLoading({
                status: true,
                text: 'logging in...'
            })
            // Login with password
            login(email, password)
                .then((user) => {
                    setLoading({
                        status: false,
                        text: ''
                    })
                    // Show Alert
                    setShowAlert({
                        status: true,
                        title: 'logged in',
                        variant: 'success'
                    })
                    setTimeout(() => {
                        setShowAlert({
                            status: false,
                            title: '',
                            variant: ''
                        })
                    }, 2000)
                })
                .catch((err) => {
                    console.log(err)
                    setShowAlert({
                        status: true,
                        title: err.message,
                        variant: 'danger'
                    })
                    setTimeout(() => {
                        setShowAlert({
                            status: false,
                            title: '',
                            variant: ''
                        })
                    }, 2000)
                    setLoading({
                        status: false,
                        text: ''
                    })
                })
        } else {
            setShowAlert({
                status: true,
                title: 'Please fill in all fields',
                variant: 'danger'
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: ''
                })
            }, 3000)
        }

    }

    // Sign in with Google
    const handleSignInWithGoogle = (e) => {
        e.preventDefault()
        setLoading({
            status: true,
            text: 'logging in with google...'
        })
        signInWithGoogle()
    }
    useEffect(() => {
        auth.getRedirectResult()
            .then((user) => {
                setLoading({
                    status: true,
                    text: 'logging in with google...'
                })
                if (user.user !== null) {
                    // Split name into first and last name
                    const nameArr = user && user.user.displayName.split(' ')
                    setLoading({
                        status: false,
                        text: ''
                    })
                    // Show Alert
                    setShowAlert({
                        status: true,
                        title: 'logged in',
                        variant: 'success'
                    })
                    setTimeout(() => {
                        setShowAlert({
                            status: false,
                            title: '',
                            variant: ''
                        })
                    }, 2000)
                    db.collection('users').doc(user.user.uid).get()
                        .then((doc) => {
                            if (doc.exists) {
                                history.push('/')
                            }
                            else {
                                db.collection('transactions').add({
                                    amount: 100,
                                    user: user.user.email,
                                    type: 'credit',
                                    remarks: 'Sign Up Bonus',
                                    datetime: new Date()
                                })
                                db.collection('users').doc(user.user.uid).set({
                                    email: user.user.email,
                                    firstName: nameArr[0],
                                    lastName: nameArr[1],
                                    photoURL: user.user.photoURL,
                                    profileComplete: false,
                                    connections: [],
                                    requests: [],
                                    createdAt: new Date(),
                                    profileImage: '',
                                }).then(() => {
                                    history.push('/')
                                }
                                )
                            }
                        })
                }
            }).catch((err) => {
                console.log(err)
                setShowAlert({
                    status: true,
                    title: err.message,
                    variant: 'danger'
                })
                setTimeout(() => {
                    setShowAlert({
                        status: false,
                        title: '',
                        variant: ''
                    })
                }, 2000)
                setLoading({
                    status: false,
                    text: ''
                })
            })
    }, [setLoading, setShowAlert, history])


    return (currentUser) ?
        (<Redirect to='/' />)
        : (
            <AuthScreen>
                <h1 className='c-primary headingL'>login</h1>
                <p className='content'>one-stop solution for all student needs.</p>
                <Spacer h='16px' />
                <form className='form' autoComplete='off'>
                    <div className="inputGroup">
                        <Input type="email" placeholder='email id' id='email' value={email} onChange={e => (setEmail(e.target.value))} required='true' />
                    </div>
                    <div className="inputGroup">
                        <Input type={showPwd ? "text" : "password"} placeholder='password' value={password} onChange={e => (setPassword(e.target.value))} id='password' required='true' />
                        <div className="icon" onClick={e => (setShowPwd(!showPwd))}>
                            {showPwd ?
                                <Icon.EyeOff size={22} />
                                :
                                <Icon.Eye size={22} />
                            }
                        </div>
                    </div>
                    <div className="inputGroup">
                        <Button disabled={loadingStatus} variant='primary' type='submit' title='continue with email' onClick={handleSignInWithPwd} />
                    </div>
                    <div className="inputGroup rowCenter">
                        <Link to='/forgot-password'
                            className="c-primary link contentM"
                        >
                            forgot password?
                        </Link>
                    </div>
                    <div className="inputGroup seperator">
                        <div className="bar"></div>
                        <p>or</p>
                        <div className="bar"></div>
                    </div>
                    <div className="inputGroup">
                        <Button disabled={loadingStatus} variant='google' title='continue with google' iconImg='/assets/icons/googleIcon.png' onClick={handleSignInWithGoogle} />
                    </div>
                </form>
                <div className="text contentM">
                    <p>not a part of the fam? <Link className='link c-primary' to='/signup'>join</Link>
                    </p>
                </div>
            </AuthScreen>
        )
}

export default Login