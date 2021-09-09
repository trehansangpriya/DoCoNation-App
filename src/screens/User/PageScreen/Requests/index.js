import React, { useEffect, useState } from 'react'
import './style.css'
import { useAuthContext } from './../../../../lib/contexts/AuthContext';
import { db } from '../../../../lib/config/firebaseConfig';
import { motion } from 'framer-motion';
import ReceivedRequestCard from './Received';
import SentRequestCard from './Sent';

const Requests = () => {
    const tags = ['received', 'sent']
    const [selectedTag, setSelectedTag] = useState('received')
    const [receivedRequests, setReceivedRequests] = useState([])
    const [sentRequests, setSentRequests] = useState([])
    const { userData } = useAuthContext()
    const { requests } = userData
    useEffect(() => {
        db.collection('users').where('profileComplete', '==', true).onSnapshot(snapshot => {
            setReceivedRequests(snapshot.docs.filter(
                doc => requests.includes(doc.data().email)
            ).map(doc => ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                interests: doc.data().interests,
                bio: doc.data().bio,
                dateOfBirth: doc.data().dateOfBirth,
                profileImage: doc.data().profileImage,
                email: doc.data().email,
            })))
        })
        db.collection('users').where('requests', 'array-contains', userData.email).onSnapshot(snapshot => {
            setSentRequests(snapshot.docs.map(doc => ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                interests: doc.data().interests,
                bio: doc.data().bio,
                dateOfBirth: doc.data().dateOfBirth,
                email: doc.data().email,
                profileImage: doc.data().profileImage,
            })))
        })

    }, [requests, userData.email])

    return (
        <div className='requests'>
            <div className="tabs">
                {
                    tags.map((tag, index) => (
                        <div
                            key={index}
                            className={tag === selectedTag ? 'tab selected' : 'tab'}
                            onClick={e => setSelectedTag(tag)}
                        >
                            {tag}
                            &nbsp;
                            {tag === 'received' && <span>({receivedRequests.length})</span>}
                            {tag === 'sent' && <span>({sentRequests.length})</span>}
                        </div>
                    ))
                }
            </div>
            {
                selectedTag === 'received' && (
                    <motion.div
                        initial={{
                            y: '10vh',
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        className='requestsList'>
                        {receivedRequests.length > 0 ?
                            receivedRequests.map((request) => (
                                <ReceivedRequestCard
                                    key={request.id}
                                    request={request}
                                    id={request.id}
                                />
                            ))


                            :
                            <div className="noReceivedRequests contentXL">
                                No requests received
                            </div>
                        }
                    </motion.div>
                )

            }
            {
                selectedTag === 'sent' &&
                <motion.div
                    initial={{
                        y: '10vh',
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    className='requestsList'>
                    {sentRequests.length > 0 ?
                        sentRequests.map((request, index) => (
                            <SentRequestCard
                                key={index}
                                request={request}
                                id={request.id}
                            />
                        ))
                        :
                        <div className="noSentRequests contentXL">
                            No requests sent
                        </div>
                    }
                </motion.div>

            }
        </div>
    )
}

export default Requests
