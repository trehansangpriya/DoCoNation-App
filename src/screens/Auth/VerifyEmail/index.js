import React, { useState } from 'react'
import { CheckCircle, LogOut, Send } from 'react-feather'
import Button from '../../../components/Utilities/Button'
import Spacer from '../../../components/Utilities/Spacer'
import { auth } from '../../../lib/config/firebaseConfig';
import { useAuthContext } from './../../../lib/contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const VerifyEmail = () => {
    const { loading, setLoading, logOut, setShowAlert, currentUser } = useAuthContext()
    const [timer, setTimer] = useState(null)
    const [verifyButton, setVerifyButton] = useState({
        title: 'send verification email',
        icon: <Send />,
        variant: 'primary',
        disabled: loading.status
    })
    const actionCodeSettings = {
        url: 'http://localhost:3000/login'
    }
    const startCountdown = (time) => {
        let counter = time
        const interval = setInterval(() => {
            setTimer(counter)
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                setTimer(null)
            }
        }, 1000);
    }
    const handleLogout = () => {
        setLoading({
            status: true,
            text: "logging out..."
        })
        setTimeout(() => {
            logOut()
            setLoading({
                status: false,
                text: ""
            })
            setShowAlert({
                status: true,
                title: 'logged out',
                variant: 'success'
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: ''
                })
            }, 1000)
        }, 2000)
    }
    const handleSend = () => {
        setLoading({
            status: true,
            text: "sending verification email..."
        })
        auth.currentUser.sendEmailVerification(actionCodeSettings).then(() => {
            setLoading({
                status: false,
                text: ""
            })
            setVerifyButton({
                title: 'verification email sent',
                icon: <CheckCircle />,
                variant: 'primary-light',
                disabled: true
            })
            setShowAlert({
                status: true,
                title: 'verification email sent! check your email',
                variant: 'success'
            })
            startCountdown(59)
            setTimeout(() => {
                setVerifyButton({
                    title: 'send again?',
                    icon: <Send />,
                    variant: 'primary',
                    disabled: loading.status
                })
            }, 60000)
            setTimeout(() => {

                setShowAlert({
                    status: false,
                    title: '',
                    variant: ''
                })
            }, 5000)
        }).catch((error) => {
            setLoading({
                status: false,
                text: ""
            })
            setShowAlert({
                status: true,
                title: 'error sending verification email',
                variant: 'danger'
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: ''
                })
            }, 1000)
        })
    }

    return !currentUser.emailVerified ? (
        <div>
            <Spacer h='12vh' />
            <h1 className='c-primary headingL'>verification</h1>
            <p className='content'>verify your email address to access the app.</p>
            {timer &&
                <div className="timer">
                    <Spacer h='24px' />
                    send email again in, <b>{timer}</b> seconds
                </div>
            }
            <Spacer h='24px' />
            <Button
                icon={verifyButton.icon}
                title={verifyButton.title}
                variant={verifyButton.variant}
                disabled={verifyButton.disabled}
                onClick={handleSend}
            />
            <Spacer h='4px' />

            <Button
                icon={<LogOut />}
                title='logout'
                variant='secondary'
                disabled={loading.status}
                onClick={handleLogout}
            />
            <br />
            <div className="content">
                done verifying? refresh to access the app.
            </div>

        </div>
    )
        : (
            <Redirect to='/' />
        )
}

export default VerifyEmail
