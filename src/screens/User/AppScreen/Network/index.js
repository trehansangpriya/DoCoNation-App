import { AnimateSharedLayout, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../../../lib/config/firebaseConfig';
import { useAuthContext } from './../../../../lib/contexts/AuthContext';
import UserCard from './UserCard';
import NetworkHeader from './Header';
import './style.css'
import Spacer from '../../../../components/Utilities/Spacer';

const Network = () => {
    const tags = ['vibe together', 'my connections']
    const [selectedTag, setSelectedTag] = useState('vibe together')
    const { userData, currentUser } = useAuthContext()
    const [peopleLikeMe, setPeopleLikeMe] = useState([]);
    const [myConnections, setMyConnections] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    useEffect(() => {
        userData && userData.interests && db.collection('users').where('interests', 'array-contains-any', userData.interests).onSnapshot(snapshot => {
            setPeopleLikeMe(snapshot.docs.filter(
                doc => doc.data().profileComplete === true && doc.id !== currentUser.uid && !doc.data().connections.includes(currentUser.email) && !userData.requests.includes(doc.data().email) && !doc.data().requests.includes(userData.email) && !userData.connections.includes(doc.data().email)
            ).map(doc => ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                interests: doc.data().interests,
                bio: doc.data().bio,
                dateOfBirth: doc.data().dateOfBirth,
                profileImage: doc.data().profileImage,
            })))
        })
        userData && userData.connections && db.collection('users').onSnapshot(snapshot => {
            setMyConnections(snapshot.docs.filter(
                doc => userData.connections.includes(doc.data().email)
            ).map(doc => ({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                interests: doc.data().interests,
                bio: doc.data().bio,
                dateOfBirth: doc.data().dateOfBirth,
                profileImage: doc.data().profileImage,
            })))
        })
        setPendingCount(userData && userData.requests && userData.requests.length)
    }, [userData, currentUser.uid, currentUser.email])
    return userData && userData.profileComplete ?
        (
            <div className='network'>
                <NetworkHeader count={pendingCount} />
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
                                {tag === 'vibe together' && <span>({peopleLikeMe.length})</span>}
                                {tag === 'my connections' && <span>({myConnections.length})</span>}
                            </div>
                        ))
                    }
                </div>
                {
                    selectedTag === 'vibe together' &&
                    (peopleLikeMe.length > 0 ? (
                        <AnimateSharedLayout>
                            <Spacer h='8px' />
                            <motion.div
                                layout className="userList">
                                {peopleLikeMe.map(person => (
                                    <UserCard key={person.id} person={person} type='suggestion' />
                                ))}
                            </motion.div>
                        </AnimateSharedLayout>
                    )
                        :
                        <div
                            className="noContent">
                            <Spacer h='8px' />
                            <h2 className='contentXL'>
                                No connections to add.
                            </h2>
                        </div>)

                }
                {
                    selectedTag === 'my connections' &&
                    (myConnections.length > 0 ? (
                        <AnimateSharedLayout>
                            <Spacer h='8px' />
                            <motion.div
                                layout
                                className="userList">
                                {myConnections.map(connection => (
                                    <UserCard key={connection} person={connection} type='connection' />
                                ))}
                            </motion.div>
                        </AnimateSharedLayout>
                    ) :
                        (
                            <div
                                className="noContent">
                                <Spacer h='8px' />
                                <h2 className='contentXL'>
                                    No connections
                                </h2>
                            </div>
                        ))
                }
            </div>
        )
        :
        (
            <div style={{
                marginTop: '12px'
            }}>
                <h2>to enable network feature, please complete your profile!</h2>
                <br />
                <Link to='/edit-profile' className='btn c-primary'>
                    complete your profile &gt;
                </Link>
            </div>
        )
}

export default Network