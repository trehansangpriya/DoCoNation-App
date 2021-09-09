import React from 'react'
import * as Icon from 'react-feather'
import './style.css'
import { useAuthContext } from './../../../lib/contexts/AuthContext';
import { motion } from 'framer-motion';

const Alert = () => {
    const { showAlert } = useAuthContext()
    const { title, variant, status } = showAlert
    return (status && (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
        >
            <div className={`alert alert-${variant}`}>
                <div className="icon">
                    {variant === 'danger' ? <Icon.AlertCircle size={18} strokeWidth={3} /> : null}
                    {variant === 'success' ? <Icon.CheckCircle size={18} strokeWidth={3} /> : null}
                    {variant === 'warning' ? <Icon.AlertTriangle size={18} strokeWidth={3} /> : null}
                </div>
                {title}
            </div>
        </motion.div>
    )
    )
}

export default Alert