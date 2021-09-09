import React, { useEffect, useState } from 'react'
import { db } from '../../../lib/config/firebaseConfig';
import { useAuthContext } from './../../../lib/contexts/AuthContext';
import './style.css'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-feather';

const Resources = () => {
    const { setLoading } = useAuthContext()
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setLoading({
            text: 'Loading...',
            status: true
        })
        db.collection('resourceCategories').orderBy('name', 'asc').onSnapshot(snapshot => {
            setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading({
                text: '',
                status: false
            })
        });
    }, [setLoading])
    return (
        <div className='resourceCategories'>
            <div className="categoryList">
                {categories.map((category, index) => (
                    <Link key={index} to={`/resources/${category.slug}`} className='link category' >
                        {category.name}
                        <ArrowRight size={18} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Resources