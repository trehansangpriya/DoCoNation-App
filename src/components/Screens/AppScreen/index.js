import React, { useEffect, useRef } from 'react'
import Alert from '../../Utilities/Alert'
import Loading from '../../Utilities/Loading'
import BottomNav from './BottomNav'
import Header from './Header'
import './style.css'
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../lib/contexts/AuthContext'

const AppScreen = ({ children }) => {
    const { setNavOpen } = useAuthContext()
    const screen = useRef();
    useEffect(() => {
        const handleClick = (e) => {
            if (screen.current && screen.current.contains(e.target)) {
                setNavOpen(false);
            }
            // setNavOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [setNavOpen]);
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
                    y: '0',
                    opacity: 1,
                }}
                ref={screen}
            >
                {children}
            </motion.div>
            <BottomNav />
            <Alert />
        </div >
    )

}

export default AppScreen