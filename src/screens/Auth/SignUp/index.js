import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../lib/contexts/AuthContext';
import { Link, Redirect, useHistory } from 'react-router-dom';
import '../style.css'
import Spacer from './../../../components/Utilities/Spacer';
import * as Icon from 'react-feather'
import Button from '../../../components/Utilities/Button';
import { auth, db } from './../../../lib/config/firebaseConfig';
import AuthScreen from '../../../components/Screens/AuthScreen/index';
import Input from '../../../components/Utilities/Input';

const SignUp = () => {
    const { currentUser, signup, signInWithGoogle, loading, setLoading, setShowAlert } = useAuthContext()
    const { loadingStatus } = loading
    // useState for toggling showPwd icon
    const [showPwd, setShowPwd] = useState(false)
    const history = useHistory()
    // useStates for inputs
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSignUpWithPwd = (e) => {
        e.preventDefault()
        // Check if all inputs are filled
        if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0) {
            setLoading({
                status: true,
                text: 'creating an account...'
            })
            // Sign Up
            signup(email, password)
                .then((user) => {
                    setLoading({
                        status: false,
                        text: ''
                    })
                    // Show Alert
                    setShowAlert({
                        status: true,
                        title: 'account created successfully',
                        variant: 'success'
                    })
                    setTimeout(() => {
                        setShowAlert({
                            status: false,
                            title: '',
                            variant: ''
                        })
                    }, 2000)
                    // Add User to Db
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
                                    email: email,
                                    firstName: firstName,
                                    lastName: lastName,
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
    const handleSignUpWithGoogle = (e) => {
        e.preventDefault()
        setLoading({
            status: true,
            text: 'signing up with google...'
        })
        signInWithGoogle()
    }
    useEffect(() => {
        auth.getRedirectResult()
            .then((user) => {
                console.log(user);
                if (user.user !== null) {
                    setLoading({
                        status: true,
                        text: 'logging in with google...'
                    })
                    // Split name into first and last name
                    const nameArr = user.user.displayName.split(' ')
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
                                })
                            }
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
                }
            })
    }, [history, setLoading, setShowAlert])
    return (currentUser) ?
        (<Redirect to='/' />)
        : (
            <AuthScreen>
                <h1 className='c-primary headingL'>sign up</h1>
                <p className='content'>the world of online communities.</p>
                <Spacer h='16px' />
                <form className='form' autoComplete='off'>
                    <div className='inputGroup'>
                        <Input id='firstName' placeholder='first name' type='text' value={firstName} onChange={e => (setFirstName(e.target.value))} required='true' />
                    </div>
                    <div className='inputGroup'>
                        <Input id='lastName' placeholder='last name' type='text' value={lastName} onChange={e => (setLastName(e.target.value))} required='true' />
                    </div>
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
                        <Button disabled={loadingStatus} variant='primary' type='submit' title='continue' onClick={handleSignUpWithPwd} />
                    </div>
                    <div className="inputGroup seperator">
                        <div className="bar"></div>
                        <p>or</p>
                        <div className="bar"></div>
                    </div>
                    <div className="inputGroup">
                        <Button disabled={loadingStatus} variant='google' title='continue with google' iconImg='/assets/icons/googleIcon.png' onClick={handleSignUpWithGoogle} />
                    </div>
                </form>
                <div className="text contentM">
                    <p>already a part of the fam? <Link className='link c-primary' to='/login'>login</Link>
                    </p>
                </div>
            </AuthScreen>
        )
}

export default SignUp