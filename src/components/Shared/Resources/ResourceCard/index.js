import React, { useEffect, useState } from 'react'
import { db } from '../../../../lib/config/firebaseConfig'
import { useAuthContext } from '../../../../lib/contexts/AuthContext'
import { Award, Bookmark, Calendar, Check, Clock, Disc, FolderPlus, Info, Loader } from 'react-feather'
import firebase from 'firebase/app';
import './style.css'
import { AnimatePresence, motion } from 'framer-motion';

const ResourceCard = ({ title, category, link, level, type, id, createdAt, givenBy }) => {
    const { currentUser } = useAuthContext()
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [saveCount, setSaveCount] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [communityData, setCommunityData] = useState()
    const [contributer, setContributer] = useState()
    useEffect(() => {
        setSaving(true)
        db.collection('resources').doc(id).onSnapshot(doc => {
            setSaved(doc.data().users.includes(currentUser.email))
            setSaveCount(doc.data().users.length)
            setSaving(false)
        })
        givenBy.community && db.collection('communities').doc(givenBy.community).onSnapshot(doc => {
            setCommunityData({ ...doc.data() })
        })
        givenBy.user && db.collection('users').where('email', '==', givenBy.user).onSnapshot(doc => {
            setContributer({
                firstName: doc.docs[0].data().firstName,
                lastName: doc.docs[0].data().lastName,
                profileImage: doc.docs[0].data().profileImage
            })
        })
    }, [currentUser.email, id, givenBy])
    const handleSave = () => {
        setSaving(true)
        setTimeout(() => {
            if (currentUser) {
                db.collection('resources').doc(id).update({
                    users: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                })
                    .then(() => {
                        setSaving(false)
                        setSaved(true)
                    })
            }
        }, 500)
    }
    const handleUnsave = () => {
        setSaving(true)
        setTimeout(() => {
            if (currentUser) {
                db.collection('resources').doc(id).update({
                    users: firebase.firestore.FieldValue.arrayRemove(currentUser.email)
                })
                    .then(() => {
                        setSaving(false)
                        setSaved(false)
                    })
            }
        }, 500)
    }
    return (
        <motion.div layout className='resourceCard'>
            <motion.div layout className='resourceCardHeader'>
                <motion.div layout className='resourceCardIcon' onClick={e => setIsOpen(!isOpen)}>
                    <motion.div layout className="img">
                        <motion.img layout src={`/assets/icons/${type}.png `} alt={type} />
                    </motion.div>
                </motion.div>
                <motion.div layout className='resourceCardContent' onClick={e => setIsOpen(!isOpen)}>
                    <div className='resourceCardTitle'>
                        {title}
                    </div>
                    <div className='resourceCardLevel'>
                        <span>{category}</span>
                        <span>{level}</span>
                    </div>
                </motion.div>
                <motion.div layout className="resourceCardSaveHolder">
                    <motion.div layout className='resourceCardSave'>
                        {
                            saving ? (
                                <AnimatePresence>
                                    <motion.div
                                        layout
                                        className='resourceCardSaveIcon rotate'>
                                        <Loader size={28} />
                                    </motion.div>
                                </AnimatePresence>
                            )
                                :
                                (
                                    <AnimatePresence>
                                        {saved ?
                                            (
                                                <motion.div
                                                    layout
                                                    className="resourceCardSaveIcon">
                                                    <Check className='c-success' size={28} onClick={handleUnsave} />
                                                </motion.div>

                                            )
                                            :
                                            (

                                                <motion.div
                                                    layout
                                                    className="resourceCardSaveIcon">
                                                    <Bookmark size={28} onClick={handleSave} />
                                                </motion.div>
                                            )}
                                    </AnimatePresence>
                                )
                        }
                        <div className="resourceCardSaveCount">
                            {saveCount}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {isOpen &&
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        layout
                        className='resourceCardInfo'
                    >
                        <motion.div layout className='resourceCardInfoDetails'>
                            <div ><Award />&nbsp;level:&nbsp;<span>{level}</span> </div>
                            <div ><Info />&nbsp;category:&nbsp;<span>{category}</span> </div>
                            <div ><Disc />&nbsp;type:&nbsp;<img
                                src={`/assets/icons/${type}.png`}
                                alt={type}
                                width='24px'
                            />&nbsp;<span>{type}</span>
                            </div>
                            <div ><Calendar />&nbsp;date:&nbsp;<span>{createdAt.date}</span></div>
                            <div ><Clock />&nbsp;time:&nbsp;<span>{createdAt.time}</span></div>
                            <div ><FolderPlus />&nbsp;given by:&nbsp;
                                {
                                    givenBy.community !== '' &&
                                    (
                                        <a href={communityData.website}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className="givenBy">
                                            <img src={communityData.image} alt={communityData.name} />
                                            <span>{communityData.name}</span>
                                        </a>
                                    )
                                }
                                {
                                    givenBy.user !== '' &&
                                    (
                                        <span className="givenBy">
                                            <img src={contributer.profileImage} alt={contributer.firstName} />
                                            <span>{contributer.firstName} {contributer.lastName}</span>
                                        </span>
                                    )
                                }
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            layout
                            className='resourceCardInfoLink'>
                            <a
                                href={link}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-primary'
                            >
                                view resource
                            </a>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default ResourceCard