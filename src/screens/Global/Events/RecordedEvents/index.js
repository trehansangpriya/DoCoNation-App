import React, { useEffect, useState } from 'react'
import { db } from '../../../../lib/config/firebaseConfig';
import RecordedEventCard from './RecordedEventCard';
import { Filter } from 'react-feather';
import './style.css'
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../../../lib/contexts/AuthContext';
const RecordedEvents = () => {
    const [tags, setTags] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [openFilter, setOpenFilter] = useState(false)
    const [pastEvents, setPastEvents] = useState([]);
    const { setLoading } = useAuthContext()
    useEffect(() => {
        setLoading({
            text: 'Loading...',
            status: true
        })
        db.collection('tags').orderBy('priority', 'asc').onSnapshot(snapshot => {
            setTags(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    title: doc.data().title
                }
            )))
        })
        db.collection('ytVids').orderBy('published', 'desc').onSnapshot(
            snapshot => {
                setPastEvents(
                    snapshot.docs.map(doc => {
                        return {
                            id: doc.id,
                            title: doc.data().title,
                            subtitle: doc.data().subtitle,
                            published: doc.data().published,
                            link: doc.data().link,
                            image: doc.data().image,
                            tags: doc.data().tags
                        }
                    })
                )
                setLoading({
                    text: '',
                    status: false
                })
            }
        )
    }, [setLoading])
    return (
        <div className='pastEvents'>
            <div className="pastEventsFilters">

                <div className="filter">
                    <div className="filterButton" onClick={e => setOpenFilter(!openFilter)} >
                        {selectedFilter}
                        <Filter />
                    </div>
                    <AnimatePresence>
                        {openFilter &&
                            <motion.div
                                initial={{
                                    y: -5,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                transition={{
                                    duration: 0.15,
                                }}
                                layout
                                className="filterOptions"
                            >
                                {tags.map((tag, index) => (
                                    <motion.div
                                        key={index}
                                        className='filterOption'
                                        onClick={e => {
                                            setSelectedFilter(tag.title)
                                            setOpenFilter(false)
                                        }}
                                        layout
                                    >
                                        {tag.title}
                                        {tag.title === selectedFilter && <Filter />}
                                    </motion.div>
                                ))}
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            </div>
            <motion.div
                initial={{
                    y: '10vh',
                    opacity: 0,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                className="pastEventsList">
                {pastEvents.map(event => {
                    if (selectedFilter === 'All') {
                        return <RecordedEventCard key={event.id} event={event} />
                    }
                    if (event.tags.includes(selectedFilter)) {
                        return <RecordedEventCard key={event.id} event={event} />
                    }
                    return null
                })}
            </motion.div>
        </div>
    )
}

export default RecordedEvents