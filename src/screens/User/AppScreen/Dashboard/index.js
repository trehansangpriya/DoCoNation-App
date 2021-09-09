import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../../lib/contexts/AuthContext';

const Dashboard = () => {
    const { userData } = useAuthContext()
    return userData ? (
        <div>
            <h2 className='headingM'>hello 👋🏻</h2>
            <h1 className='headingL c-primary'>{userData.firstName.toLowerCase()}</h1>
            {
                userData.profileComplete
                    ? null :
                    <Link to='/edit-profile' className='btn c-primary'>
                        Please complete your profile &gt;
                    </Link>
            }
        </div>
    ) : null
}

export default Dashboard