import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import Loading from './../../Utilities/Loading/index';
import Alert from './../../Utilities/Alert/index';
import { useAuthContext } from './../../../lib/contexts/AuthContext';
import { Link } from 'react-router-dom';

const PageScreen = ({ children, title }) => {
    const { userData } = useAuthContext()
    return (
        <div>
            <Header title={title} />
            <Loading />
            <motion.div
                exit={{ x: '100vw' }}
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
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
                    {
                        userData && userData.profileComplete ?
                            children
                            :
                            (
                                <div style={{
                                    marginTop: '12px'
                                }}>
                                    <h2>to access the app, please complete your profile</h2>
                                    <br />
                                    <Link to='/edit-profile' className='btn c-primary'>
                                        complete your profile &gt;
                                    </Link>
                                </div>
                            )

                    }
                </motion.div>
            </motion.div>
            <Alert />
        </div>
    )
}

export default PageScreen
