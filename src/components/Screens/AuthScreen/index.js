import React from 'react'
import './style.css'
import Loading from '../../Utilities/Loading';
import Alert from '../../Utilities/Alert';
import { motion } from 'framer-motion';
const AuthScreen = ({ children }) => {
    return (
        <div className='authScreen'>
            <Loading />
            <motion.div
                initial={{
                    y: '20vh',
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                exit={{
                    y: '20vh',
                    opacity: 0,
                }}
            >
                {children}
            </motion.div>
            <Alert />
        </div>
    )
}

export default AuthScreen
