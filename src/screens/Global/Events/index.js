import React, { useEffect, useState } from 'react'
import './style.css'
import { db } from './../../../lib/config/firebaseConfig';
import EventCard from './EventCard';
import { motion } from 'framer-motion';
import getDateTime from './../../../lib/functions/getDateTime';
import { Link } from 'react-router-dom';
import { useAuthContext } from './../../../lib/contexts/AuthContext';

const Events = () => {
    const { setLoading } = useAuthContext()
    const tags = ['live now 🔴', 'upcoming 📅']
    const [selectedTag, setSelectedTag] = useState('live now 🔴')
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [liveEvents, setLiveEvents] = useState([]);
    const [pastEventCount, setPastEventCount] = useState(0);
    useEffect(() => {
        setLoading({
            text: 'Loading...',
            status: true
        })
        db.collection('ytVids').onSnapshot(
            snapshot => {
                setPastEventCount(snapshot.docs.length)
            }
        )
        db.collection('events').orderBy('datetime', 'asc').onSnapshot(
            snapshot => {
                const upcoming = snapshot.docs.filter(
                    (doc) => {
                        if (doc.data().status === 'Published') {
                            return {
                                id: doc.id,
                                data: doc.data(),
                            }
                        } else {
                            return null
                        }
                    }
                )
                const live = snapshot.docs.filter(
                    (doc) => {
                        if (doc.data().status === 'Live') {
                            return {
                                id: doc.id,
                                data: doc.data(),
                            }
                        } else {
                            return null
                        }
                    }
                )
                setUpcomingEvents(upcoming.map((doc) => ({
                    id: doc.id,
                    datetime: doc.data().datetime,
                    title: doc.data().title,
                    status: doc.data().status,
                    subtitle: doc.data().subtitle,
                    eventLink: doc.data().eventLink,
                    image: doc.data().image,
                    calendarLink: doc.data().calendarLink,
                    tags: doc.data().tags,
                })))
                setLiveEvents(live.map(doc => ({
                    id: doc.id,
                    datetime: doc.data().datetime,
                    title: doc.data().title,
                    subtitle: doc.data().subtitle,
                    eventLink: doc.data().eventLink,
                    status: doc.data().status,
                    image: doc.data().image,
                    tags: doc.data().tags,
                    calendarLink: doc.data().calendarLink,
                })))
                setLoading({
                    text: '',
                    status: false
                })
            })
        if (liveEvents.length === 0) {
            setSelectedTag('upcoming 📅')
        } else {
            setSelectedTag('live now 🔴')
        }
    }, [liveEvents.length])

    return (
        <div className='events'>
            <Link to='/events/recorded-events' className="recordedEvents link">
                <div className="recordedEventsText">
                    recorded events
                </div>
                <div className="recordedEventsCount">
                    {pastEventCount}
                </div>
            </Link>
            <div className="tabs">
                {
                    tags.map((tag, index) => (
                        <div
                            key={index}
                            className={tag === selectedTag ? 'tab selected' : 'tab'}
                            onClick={e => setSelectedTag(tag)}
                        >
                            {tag}
                        </div>
                    ))
                }

            </div>
            {
                selectedTag === 'live now 🔴' &&
                <motion.div
                    initial={{
                        y: '10vh',
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    className='eventsList'>
                    {
                        liveEvents.map(({ id, datetime, title, subtitle, eventLink, image, status, tags }) => {
                            const eventDate = getDateTime(datetime).date
                            const eventTime = getDateTime(datetime).time
                            return (
                                <EventCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    subtitle={subtitle}
                                    link={eventLink}
                                    status={status}
                                    image={image}
                                    date={eventDate}
                                    time={eventTime}
                                    tags={tags}
                                />
                            )
                        })
                    }
                    {
                        liveEvents.length === 0 &&
                        <div className='noEvents'>
                            <h1 className='headingM'>No Live Events</h1>
                            <p className='contentM'>Check back later for more events</p>
                            <p
                                className='c-primary link content'
                                style={{ marginTop: '4px' }}
                                onClick={(e) => (setSelectedTag('upcoming 📅'))}
                            >
                                see upcoming events
                            </p>
                        </div>
                    }
                </motion.div>
            }
            {
                selectedTag === 'upcoming 📅' &&
                <motion.div
                    initial={{
                        y: '10vh',
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    className='eventsList'>
                    {
                        upcomingEvents.map(({ id, datetime, calendarLink, title, subtitle, eventLink, image, tags, status }) => {
                            const eventDate = getDateTime(datetime).date
                            const eventTime = getDateTime(datetime).time
                            return (
                                <EventCard
                                    key={id}
                                    id={id}
                                    title={title}
                                    subtitle={subtitle}
                                    status={status}
                                    link={eventLink}
                                    calendarLink={calendarLink}
                                    image={image}
                                    date={eventDate}
                                    time={eventTime}
                                    tags={tags}
                                />
                            )
                        })
                    }
                    {
                        upcomingEvents.length === 0 &&
                        <div className='noEvents'>
                            <h1 className='headingM'>No Upcoming Events</h1>
                            <p className='contentM'>Check back soon!</p>
                        </div>
                    }
                </motion.div>
            }
        </div>
    )
}

export default Events
