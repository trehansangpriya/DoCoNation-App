import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, MinusCircle, Calendar, Clock, Info } from 'react-feather';
import './style.css'

const TransactionCard = ({ title, amount, type, date, time, id }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <motion.div className='transactionCard' layout onClick={e => setIsOpen(!isOpen)}>
            <motion.div layout className='transactionInfo'>
                <motion.div layout className='transactionIcon'>
                    {type === 'credit' ? <PlusCircle className='c-success' /> : <MinusCircle className='c-danger' />}
                </motion.div>
                <motion.div layout className='transactionDetails'>
                    <motion.div layout className='transactionAmount'>{amount} DoCoCoins</motion.div>
                    <motion.div layout className='transactionTitle'>{title}</motion.div>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                        className="transactionMoreDetails">
                        <motion.div layout className='transactionDate'><Calendar />&nbsp; {date}</motion.div>
                        <motion.div layout className='transactionTime'><Clock />&nbsp; {time}</motion.div>
                        <motion.div layout className='transactionId'><Info />&nbsp; {id}</motion.div>
                    </motion.div>
                }
            </AnimatePresence>

        </motion.div>
    )
}

export default TransactionCard