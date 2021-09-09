import { AnimateSharedLayout } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResourceCard from '../../../../components/Shared/Resources/ResourceCard';
import Input from '../../../../components/Utilities/Input';
import { db } from '../../../../lib/config/firebaseConfig'
import getDateTime from './../../../../lib/functions/getDateTime';
import './style.css'
import { useAuthContext } from './../../../../lib/contexts/AuthContext';

const ViewResources = () => {
    const { loading, setLoading } = useAuthContext()
    const [resources, setResources] = useState([])
    const [search, setSearch] = useState('')
    const [filteredResources, setFilteredResources] = useState([])
    const onSearch = () => {
        setFilteredResources(resources.filter(resource => resource.title.toLowerCase().includes(search.toLowerCase()) || resource.category.toLowerCase().includes(search.toLowerCase()) || resource.type.toLowerCase().includes(search.toLowerCase()) || resource.level.toLowerCase().includes(search.toLowerCase())))
    }
    const { category } = useParams()
    console.log(resources);
    useEffect(() => {
        setLoading({
            status: true,
            text: 'Loading Resources...'
        })
        db.collection('resources').where('category', '==', category).onSnapshot(
            snapshot => {
                setResources(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        title: doc.data().title,
                        link: doc.data().link,
                        createdAt: doc.data().createdAt,
                        level: doc.data().level,
                        category: doc.data().category,
                        type: doc.data().type,
                        givenBy: doc.data().givenBy,
                    }
                )))
                setLoading({
                    status: false,
                    text: ''
                })
            }
        )
    }, [category, setLoading])
    return (
        <div className='viewResources'>
            {resources.length > 0 &&
                <div className="search">
                    <Input
                        type="text"
                        placeholder="search resources"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyUp={onSearch}
                    />
                </div>}

            {
                resources.length > 0 ? (
                    <AnimateSharedLayout>
                        <div className='resourceList'>
                            {
                                search === '' ? (
                                    resources.map(resource => (
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
                                        <div className='noResources'>
                                            <h1>No results found</h1>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </AnimateSharedLayout>
                ) : !loading.status && (
                    <div className='noResources'>
                        <h2>no resources available!<br />adding more soon...</h2>
                    </div>
                )
            }
        </div>
    )
}

export default ViewResources