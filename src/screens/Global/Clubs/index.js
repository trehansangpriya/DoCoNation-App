import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from './../../../lib/config/firebaseConfig';
import './style.css'
import { useAuthContext } from './../../../lib/contexts/AuthContext';

const Clubs = () => {
    const [clubs, setClubs] = useState([]);
    const { setShowAlert } = useAuthContext()
    const alert = () => {
        setShowAlert({
            status: true,
            title: 'Club Features Coming Soon!',
            variant: 'warning',
        })
        setTimeout(() => {
            setShowAlert({
                status: false,
                title: '',
                variant: '',
            })
        }, 2000)
    }
    useEffect(() => {
        db.collection('clubs').onSnapshot(snapshot => {
            const clubs = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                desc: doc.data().desc,
                icon: doc.data().icon,
                form: doc.data().form,
            }))
            setClubs(clubs);
        })
    }, [])
    return (
        <div className='clubs'>
            <div className="clubsList">
                {clubs.map(club => (
                    <Link to={`/clubs/${club.name.toLowerCase()}`} className="club" key={club.id}>
                        {/* <div className="club" key={club.id} onClick={alert} > */}
                        <div className="clubIcon">
                            <img src={club.icon} alt={club.name} />
                        </div>
                        <div className="clubInfo">
                            <h2>{club.name}</h2>
                            <p>{club.desc}</p>
                        </div>
                        {/* </div> */}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Clubs