import React, { useState } from 'react'
import { Eye, EyeOff } from 'react-feather';
import { Link } from 'react-router-dom'
import Spacer from './../../../../components/Utilities/Spacer/index';
import { useAuthContext } from './../../../../lib/contexts/AuthContext';
import './style.css'
import getDateTime from './../../../../lib/functions/getDateTime';

const Profile = () => {
    const { userData } = useAuthContext();
    const [showEmail, setShowEmail] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    return userData && userData.profileComplete ? (
        <div className='profile'>
            <div className="profileHeader">
                <h1 className='headingM'>profile</h1>
                <Link
                    to='/edit-profile'
                    style={{ width: 'fit-content', paddingRight: '8px', paddingLeft: '8px' }}
                    className='link content btn c-primary'
                >
                    edit profile
                </Link>
            </div>
            <Spacer h='16px' />
            <div className="profileContent">
                <div className="profileImage">
                    <img
                        src={userData.profileImage
                            ?
                            userData.profileImage
                            :
                            '/assets/icons/avatar.png'}
                        alt={userData.firstName}
                    />
                </div>
                <Spacer h='16px' />
                <div className="profileInfo">
                    <div className="profileName">
                        <h2>
                            {userData.firstName}
                            <br />
                            {userData.lastName}
                        </h2>
                    </div>
                    <Spacer h='16px' />
                    <div className="profileBirthday">
                        <div className="emoji">
                            <img src='/assets/icons/bday.png' alt="birthday" />
                        </div>
                        <h3 className='contentM'>
                            {getDateTime(userData.dateOfBirth).birthday}
                        </h3>
                    </div>
                    <Spacer h='16px' />
                    <div className="profileEmail">
                        <h3 className='contentM c-primary'>
                            {
                                showEmail ?
                                    userData.email
                                    :
                                    userData.email.substring(0, 3) + '****'
                                    +
                                    '@'
                                    +
                                    userData.email.substring(userData.email.indexOf('@') + 1, userData.email.length)
                            }
                            {
                                showEmail ?
                                    <EyeOff className='c-primary icon' size={20} onClick={e => setShowEmail(false)} />
                                    :
                                    <Eye className='c-primary icon' size={20} onClick={e => setShowEmail(true)} />
                            }
                        </h3>
                    </div>
                    <Spacer h='8px' />
                    <div className="profilePhone">
                        <h3 className='contentM c-primary'>
                            {
                                showPhone ?
                                    userData.phoneNumber
                                    :
                                    userData.phoneNumber.substring(0, 2) + '*****'
                                    +
                                    userData.phoneNumber.substring(userData.phoneNumber.length - 3, userData.phoneNumber.length)
                            }
                            {
                                showPhone ?
                                    <EyeOff className='c-primary icon' size={20} onClick={e => setShowPhone(false)} />
                                    :
                                    <Eye className='c-primary icon' size={20} onClick={e => setShowPhone(true)} />
                            }
                        </h3>
                    </div>
                    <Spacer h='16px' />
                    {
                        userData.instagram !== '' || userData.linkedin !== '' ? (
                            <div className="profileSocials">
                                {
                                    userData.instagram !== '' && (
                                        <a
                                            className='profileSocialIcon'
                                            href={'https://instagram.com/' + userData.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src="/assets/icons/insta.png" alt="instagram" />
                                        </a>
                                    )
                                }
                                {
                                    userData.linkedin !== '' && (
                                        <a
                                            className='profileSocialIcon'
                                            href={userData.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img src="/assets/icons/linkedin.png" alt="linkedin" />
                                        </a>
                                    )
                                }
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <Spacer h='8px' />
            <div className="profileContent">
                <p
                    className="contentM c-primary title"
                >
                    bio
                </p>
                <div className="profileBio">
                    <h3 className='content'>
                        {userData.bio}
                    </h3>
                </div>
                <Spacer h='16px' />
                <p
                    className="contentM c-primary title"
                >
                    interests
                </p>
                <div className="profileInterests">
                    {userData.interests.map((interest, index) => (
                        <span key={index}>
                            {interest}
                        </span>
                    ))}
                </div>
            </div>
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

export default Profile