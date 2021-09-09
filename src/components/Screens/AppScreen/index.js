import React from 'react'
import Alert from '../../Utilities/Alert'
import Loading from '../../Utilities/Loading'
import BottomNav from './BottomNav'
import Header from './Header'
import './style.css'
import { motion } from 'framer-motion';

const AppScreen = ({ children }) => {
    return (
        <div className='appScreen'>
            <Header />
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
            >
                {children}
            </motion.div>
            <BottomNav />
            <Alert />
        </div>
    )

}

export default AppScreen