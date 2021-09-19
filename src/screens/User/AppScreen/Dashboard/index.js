import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../../lib/contexts/AuthContext';
import Spacer from './../../../../components/Utilities/Spacer/index';

const Dashboard = () => {
    const { userData } = useAuthContext()
    return userData ? (
        <div>
            <h2 className='headingM'>hello 👋🏻</h2>
            <h1 className='headingL c-primary'>{userData.firstName.toLowerCase()}</h1>
            {
                userData.profileComplete
                    ? (
                        <div className="details headingS">
                            <Spacer h='32px' />
                            Personalized content for you.
                            Coming soon!
                            <Spacer h='24px' />
                            <Link to='/explore' className='btn c-primary'>
                                Explore the App
                            </Link>
                        </div>
                    ) :
                    <Link to='/edit-profile' className='btn c-primary'>
                        Please complete your profile &gt;
                    </Link>
            }
        </div>
    ) : null
}

export default Dashboard