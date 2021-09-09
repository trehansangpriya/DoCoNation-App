import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useAuthContext } from '../../../../lib/contexts/AuthContext';
import './style.css'
import Spacer from '../../../../components/Utilities/Spacer/index';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { db } from '../../../../lib/config/firebaseConfig';
import TransactionCard from './TransactionCard';
import getDateTime from '../../../../lib/functions/getDateTime';
import Button from './../../../../components/Utilities/Button/index';
import { ShoppingCart } from 'react-feather';

const DoCoCoins = () => {
    const { dococoins, currentUser, setShowAlert } = useAuthContext()
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        db.collection('transactions').where('user', '==', currentUser.email).onSnapshot(
            snapshot => {
                setTransactions(snapshot.docs.map(
                    doc => ({
                        id: doc.id,
                        title: doc.data().remarks,
                        amount: doc.data().amount,
                        datetime: getDateTime(doc.data().datetime),
                        type: doc.data().type,
                    })))
            }
        )
    }, [currentUser])
    return (
        <div className='dococoins'>
            <div className="dococoinsHeader">
                <div className="dococoinsIcon">
                    <img src="/assets/icons/dococoin.png" alt="dococoin" />
                </div>
                <CountUp
                    className='dococoinsCount'
                    start={0}
                    delay={0.25}
                    end={dococoins}
                    duration={0.5}
                />
                <p className='dococoinsText'>
                    <Button
                        icon={<ShoppingCart />}
                        title='docostore'
                        variant='secondary'
                        onClick={() => {
                            // Show Alert
                            setShowAlert({
                                status: true,
                                title: 'coming soon',
                                variant: 'success'
                            })
                            setTimeout(() => {
                                setShowAlert({
                                    status: false,
                                    title: '',
                                    variant: ''
                                })
                            }, 2000)
                        }}
                    />
                </p>
            </div>
            <Spacer h='32px' />
            <motion.div
                initial={{
                    y: '30vh',
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                className="dococoinsTransactions"
            >
                <div className="dococoinsTransactionsHeader headingM">
                    transactions
                </div>
                <AnimateSharedLayout>
                    <motion.div className="dococoinsTransactionsList" layout >
                        {transactions.map(({ id, title, amount, datetime, type }) => (
                            <TransactionCard
                                key={id}
                                title={title}
                                amount={amount}
                                type={type}
                                date={datetime.date}
                                time={datetime.time}
                                id={id}
                            />
                        ))}
                    </motion.div>
                </AnimateSharedLayout>
            </motion.div>
        </div>
    )
}

export default DoCoCoins