import React from 'react'
import { ArrowLeft, Home } from 'react-feather'
import './style.css'
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = ({ title }) => {
    const history = useHistory();
    // function to go back
    const goBack = () => {
        history.goBack()
    }
    return (
        <motion.div
            exit={{ x: '100vw' }}
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className='pageHeader'>
            <div className="icon" onClick={goBack}>
                <ArrowLeft />
            </div>
            <div className="title contentXL">
                {title}
            </div>
            <div className="icon">
                <Link className="icon" to="/">
                    <Home />
                </Link>
            </div>
        </motion.div>
    )
}

export default Header