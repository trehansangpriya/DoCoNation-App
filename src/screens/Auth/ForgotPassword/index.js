import React, { useState } from 'react'
import { useAuthContext } from '../../../lib/contexts/AuthContext';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Button from './../../../components/Utilities/Button/index';
import Input from '../../../components/Utilities/Input';
import Spacer from '../../../components/Utilities/Spacer';
import AuthScreen from '../../../components/Screens/AuthScreen';
const ForgotPassword = () => {
    const { currentUser, forgotPassword, loading, setLoading, setShowAlert } = useAuthContext()
    const { loadingStatus } = loading
    const history = useHistory()
    // useStates for inputs
    const [email, setEmail] = useState('')

    // Forgot password
    const handleForgotPassword = (e) => {
        e.preventDefault()
        // Check if all inputs are filled
        if (email.length > 0) {
            setLoading({
                status: true,
                text: 'sending password reset email...'
            })
            forgotPassword(email)
                .then(() => {
                    setLoading({
                        status: false,
                        text: ''
                    })
                    setEmail('')
                    // Show Alert
                    setShowAlert({
                        status: true,
                        title: 'password reset email sent!',
                        variant: 'success'
                    })
                    setTimeout(() => {
                        setShowAlert({
                            status: false,
                            title: '',
                            variant: ''
                        })
                    }, 5000)
                    history.push('/login')
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
                title: 'Please enter your email',
                variant: 'danger'
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: ''
                })
            }, 2000)
        }

    }

    return (currentUser) ?
        (<Redirect to='/' />)
        : (
            <AuthScreen>
                <h1 className='c-primary headingL'>reset your password</h1>
                <p className='content'>one-stop solution for all student needs.</p>
                <Spacer h='16px' />
                <form className='form' autoComplete='off'>
                    <div className="inputGroup">
                        <Input type="email" placeholder='email id' id='email' value={email} onChange={e => (setEmail(e.target.value))} required='true' />
                    </div>
                    <div className="inputGroup">
                        <Button disabled={loadingStatus} variant='primary' type='submit' title='send reset link' onClick={handleForgotPassword} />
                    </div>
                </form>
                <div className="text contentM">
                    <p>go back to <Link className='link c-primary' to='/login'>login</Link>
                    </p>
                </div>
            </AuthScreen>
        )
}

export default ForgotPassword
