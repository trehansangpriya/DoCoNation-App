import React, { useEffect, useState } from 'react'
import './style.css'
import { AnimatePresence, motion } from 'framer-motion';
import Spacer from './../../../../../components/Utilities/Spacer/index';
import { UserPlus, XCircle } from 'react-feather';
import { db } from './../../../../../lib/config/firebaseConfig';
import { useAuthContext } from './../../../../../lib/contexts/AuthContext';
import firebase from 'firebase/app';
const UserCard = ({ person, type }) => {
    const { currentUser, setShowAlert } = useAuthContext()
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [connectionLink, setConnectionLink] = useState('');
    const [phone, setPhone] = useState('');
    const [instagram, setInstagram] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const sendConnectionRequest = () => {
        db.collection('users').doc(person.id).update({
            requests: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
        })
        setShowAlert({
            variant: 'success',
            title: 'Request Sent! Check pending requests.',
            status: true,
        })
        setTimeout(() => {
            setShowAlert({
                variant: '',
                title: '',
                status: false,
            })
        }, 2000)
    }
    const removeConnection = () => {
        db.collection('users').doc(currentUser.uid).update({
            connections: firebase.firestore.FieldValue.arrayRemove(connectionLink)
        })
        db.collection('users').doc(person.id).update({
            connections: firebase.firestore.FieldValue.arrayRemove(currentUser.email)
        })
        setShowAlert({
            variant: 'success',
            title: 'Connection Removed',
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
    useEffect(() => {
        type === 'connection' && db.collection('users').doc(person.id).onSnapshot(doc => {
            if (doc.data().emailPrivacy === 'public') {
                setEmail(doc.data().email);
            }
            if (doc.data().phonePrivacy === 'public') {
                setPhone(doc.data().phoneNumber);
            }
            setConnectionLink(doc.data().email)
            setInstagram(doc.data().instagram);
            setLinkedin(doc.data().linkedin);
        }
        )
    }, [currentUser.email, person.id, type])
    return (
        <motion.div layout className='userCard'>
            <motion.div layout className="userInfo">
                <div className="userImage" onClick={e => setIsOpen(!isOpen)}>
                    <img src={!person.profileImage ? '/assets/icons/avatar.png' : person.profileImage} alt={person.firstName} />
                </div>
                <div className="userName" onClick={e => setIsOpen(!isOpen)}>
                    {person.firstName}<br />{person.lastName}
                </div>
                {
                    type === 'connection' ? (
                        <div className="connect">
                            {
                                <XCircle className='c-danger' onClick={e => removeConnection()} />
                            }

                        </div>
                    ) :
                        (
                            <div className="connect">
                                {
                                    <UserPlus onClick={sendConnectionRequest} />
                                }

                            </div>
                        )
                }

            </motion.div>
            {
                isOpen &&
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                        className="userDetails">
                        <Spacer h='8px' />
                        {person.bio && (
                            <div>
                                <p className="contentM c-primary">bio</p>
                                <div className="userBio">
                                    {person.bio}
                                </div>
                                <Spacer h='16px' />
                            </div>
                        )
                        }
                        <p className="contentM c-primary">interests</p>
                        <Spacer h='8px' />
                        <div className="userInterests">
                            {person.interests.map((interest, index) => {
                                return (
                                    <div key={index} className="userInterest">
                                        {interest}
                                    </div>
                                )
                            })}
                        </div>
                        {
                            type === 'connection' && (
                                <div>
                                    {email !== '' && (
                                        <div>
                                            <Spacer h='16px' />
                                            <p className="contentM c-primary">email</p>
                                            <Spacer h='8px' />
                                            <a href={`mailto:${email}`}>
                                                {email}
                                            </a>
                                        </div>
                                    )}
                                    {phone !== '' && (
                                        <div>
                                            <Spacer h='16px' />
                                            <p className="contentM c-primary">phone</p>
                                            <Spacer h='8px' />
                                            <a href={`tel:${phone}`}>
                                                {phone}
                                            </a>
                                        </div>
                                    )}
                                    {
                                        instagram !== '' || linkedin !== '' ? (
                                            <div>
                                                <Spacer h='16px' />
                                                <p className="contentM c-primary">connect on socials</p>
                                                <Spacer h='8px' />
                                                <div className="userContact">
                                                    {
                                                        instagram !== '' && (
                                                            <a href={'https://instagram.com/' + instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <img src="/assets/icons/insta.png" alt="instagram" />
                                                            </a>
                                                        )
                                                    }
                                                    {
                                                        linkedin !== '' && (
                                                            <a href={linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <img src="/assets/icons/linkedin.png" alt="linkedin" />
                                                            </a>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ) : null
                                    }

                                </div>
                            )
                        }
                    </motion.div>
                </AnimatePresence>
            }
        </motion.div>
    )
}

export default UserCard