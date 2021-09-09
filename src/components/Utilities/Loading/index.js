import React from 'react'
import './style.css'
import { useAuthContext } from './../../../lib/contexts/AuthContext';
import { motion } from 'framer-motion';
const Loading = () => {
    const { loading } = useAuthContext()
    const { text, status } = loading;
    return status && (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.5,
                y: -50
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0
            }}
            exit={{
                opacity: 0,
                scale: 0.5,
                y: -50
            }}
            className='loading'>
            <div className="card">
                <img src="/assets/gifs/loading.gif" alt="loading" />
                <p>{text}</p>
            </div>
        </motion.div>
    )
}

export default Loading
