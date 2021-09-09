import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../../lib/config/firebaseConfig'
import Spacer from './../../../../components/Utilities/Spacer/index';
import Button from './../../../../components/Utilities/Button/index';
import './style.css'

const Club = () => {
    const [clubData, setClubData] = useState({})
    const { club } = useParams()
    useEffect(() => {
        db.collection('clubs').onSnapshot(snapshot => {
            const filter = snapshot.docs.filter(doc => doc.data().name.toLowerCase() === club)
            setClubData(filter.map(doc => doc.data())[0])
        })
    }, [club])

    return (
        <div className='clubPage'>
            <div className="clubHeader">
                <div className="clubIcon">
                    <img src={clubData.icon} alt={clubData.name} />
                </div>
                <div className="clubInfo">
                    <h1 className='headingM c-primary'>{clubData.name}</h1>
                    <p className='contentL'>{clubData.desc}</p>
                </div>
            </div>
            <Spacer h='16px' />
            <a
                href={clubData.form}
                target='_blank'
                rel='noopener noreferrer'
            >
                <Button
                    title='Join Club'
                    variant='primary'
                    type='button'
                />
            </a>
            <Spacer h='32px' />
            <h2 className='headingM c-grey'>More Club Features Coming Soon!</h2>
        </div>
    )
}

export default Club