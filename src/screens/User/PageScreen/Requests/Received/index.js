import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { CheckCircle, XCircle } from 'react-feather'
import Spacer from '../../../../../components/Utilities/Spacer'
import { db } from '../../../../../lib/config/firebaseConfig'
import firebase from 'firebase/app';
import { useAuthContext } from './../../../../../lib/contexts/AuthContext';

const ReceivedRequestCard = ({ request, id }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { setShowAlert, currentUser } = useAuthContext()
    const approveConnectionRequest = () => {
        db.collection('users').doc(currentUser.uid).update({
            requests: firebase.firestore.FieldValue.arrayRemove(request.email),
            connections: firebase.firestore.FieldValue.arrayUnion(request.email)
        })
        db.collection('users').doc(id).update({
            connections: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
        })
        setShowAlert({
            variant: 'success',
            title: 'Connection Added',
            status: true,
        })
        setTimeout(() => {
            setShowAlert({
                variant: '',
                title: '',
                status: false,
            })
        }, 3000)
    }
    const removeConnectionRequest = () => {
        db.collection('users').doc(currentUser.uid).update({
            requests: firebase.firestore.FieldValue.arrayRemove(request.email)
        })
        setShowAlert({
            variant: 'success',
            title: 'Connection Request Ignored',
            status: true,
        })
        setTimeout(() => {
            setShowAlert({
                variant: '',
                title: '',
                status: false,
            })
        }, 3000)
    }
    return (
        <div className='request'>
            <div className="requestHeader">
                <div className='requestImage' onClick={e => setIsOpen(!isOpen)}>
                    <img src={!request.profileImage ? '/assets/icons/avatar.png' : request.profileImage} alt='profile' />
                </div>
                <div className='requestName' onClick={e => setIsOpen(!isOpen)}>
                    {request.firstName}
                    <br />
                    {request.lastName}
                </div>
                <div className="requestIcons">
                    <div
                        className='requestIcon'
                        onClick={() => approveConnectionRequest()}
                    >
                        <CheckCircle className='c-success' size={26} />
                    </div>
                    <div
                        className='requestIcon'
                        onClick={() => removeConnectionRequest()}
                    >
                        <XCircle className='c-danger' size={26} />
                    </div>
                </div>
            </div>
            {
                isOpen &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}

                    className="requestBody">
                    <Spacer h='8px' />
                    {request.bio && (
                        <div>
                            <p className="contentM c-primary">bio</p>
                            <div className="requestBio">
                                {request.bio}
                            </div>
                            <Spacer h='16px' />
                        </div>
                    )
                    }
                    <p className="contentM c-primary">interests</p>
                    <Spacer h='8px' />
                    <div className="requestInterests">
                        {request.interests.map((interest, index) => {
                            return (
                                <div key={index} className="requestInterest">
                                    {interest}
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            }
        </div>
    )
}

export default ReceivedRequestCard
