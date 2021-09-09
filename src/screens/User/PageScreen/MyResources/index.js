import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../../lib/contexts/AuthContext'
import { db } from './../../../../lib/config/firebaseConfig';
import ResourceCard from './../../../../components/Shared/Resources/ResourceCard/index';
import getDateTime from '../../../../lib/functions/getDateTime';
import { Link } from 'react-router-dom';
import Input from './../../../../components/Utilities/Input/index';
import { AnimateSharedLayout, motion } from 'framer-motion';
import './style.css'

const MyResources = () => {
    const { currentUser, setLoading, loading } = useAuthContext()
    const [search, setSearch] = useState('')
    const [myResources, setMyResources] = useState([])
    const [filteredResources, setFilteredResources] = useState([])
    useEffect(() => {
        setLoading({
            text: 'Loading...',
            status: true
        })
        currentUser && db.collection('resources').where('users', 'array-contains', currentUser.email).onSnapshot(
            snapshot => {
                setMyResources(snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    link: doc.data().link,
                    createdAt: doc.data().createdAt,
                    level: doc.data().level,
                    category: doc.data().category,
                    type: doc.data().type,
                    givenBy: doc.data().givenBy,
                })))
                setLoading({
                    text: '',
                    status: false
                })
            }
        )
    }, [currentUser, setLoading])
    const onSearch = () => {
        setFilteredResources(myResources.filter(resource => resource.title.toLowerCase().includes(search.toLowerCase()) || resource.category.toLowerCase().includes(search.toLowerCase()) || resource.type.toLowerCase().includes(search.toLowerCase()) || resource.level.toLowerCase().includes(search.toLowerCase())))
    }
    return (
        <motion.div
            className='myResources'>
            <motion.div className="search">
                <Input
                    type="text"
                    placeholder="search resources"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyUp={onSearch}
                />
            </motion.div>
            <AnimateSharedLayout>
                {
                    myResources.length > 0 ? (
                        <motion.div layout className='myResourcesList'>
                            {
                                search === '' ? (
                                    myResources.map(resource => (
                                        <ResourceCard
                                            key={resource.id}
                                            category={resource.category}
                                            title={resource.title}
                                            createdAt={getDateTime(resource.createdAt)}
                                            id={resource.id}
                                            level={resource.level}
                                            link={resource.link}
                                            type={resource.type}
                                            givenBy={resource.givenBy}
                                        />
                                    ))
                                ) : (
                                    filteredResources.length > 0 ? (
                                        filteredResources.map(resource => (
                                            <ResourceCard
                                                key={resource.id}
                                                category={resource.category}
                                                title={resource.title}
                                                createdAt={getDateTime(resource.createdAt)}
                                                id={resource.id}
                                                level={resource.level}
                                                link={resource.link}
                                                type={resource.type}
                                                givenBy={resource.givenBy}
                                            />
                                        ))
                                    ) : (
                                        <motion.div layout className='noResources'>
                                            <h1>No results found</h1>
                                        </motion.div>
                                    )
                                )
                            }
                        </motion.div>
                    ) : !loading.status && (
                        <div className='noResources'>
                            <h2>you haven't saved any resource 💔</h2>
                            <span>
                                You can add resources&nbsp;<Link to='/resources' className='link c-primary'>here</Link>
                            </span>
                        </div>
                    )
                }
            </AnimateSharedLayout>
        </motion.div>
    )
}

export default MyResources