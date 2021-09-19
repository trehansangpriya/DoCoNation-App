import React from 'react'
import { motion } from 'framer-motion';
import Loading from './../../Utilities/Loading/index';
import Alert from './../../Utilities/Alert/index';
import { ArrowLeft } from 'react-feather';
import { useHistory } from 'react-router-dom';

const FullScreen = ({ children }) => {
    const history = useHistory();
    // function to go back
    const goBack = () => {
        history.goBack()
    }
    return (
        <div>
            <motion.div
                exit={{ x: '100vw' }}
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className='pageHeader'>
                <div className="icon" onClick={goBack}>
                    <ArrowLeft />
                </div>
            </motion.div>
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
                exit={{
                    y: '20vh',
                    opacity: 0,
                }}
                transition={{ type: "tween", duration: 0.2 }}
            >
                <motion.div
                    initial={{
                        y: '10vh',
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                >
                    {children}
                </motion.div>
            </motion.div>
            <Alert />
        </div>
    )
}

export default FullScreen
