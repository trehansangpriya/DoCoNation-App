import React, { useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import './style.css'
import countryData from '../../../../../data/countryData.json'
import Input from '../../../../../components/Utilities/Input'
import { Redirect, useHistory } from 'react-router-dom'
import { useAuthContext } from './../../../../../lib/contexts/AuthContext';
import Button from './../../../../../components/Utilities/Button/index';
import { Link, Save } from 'react-feather'
import { db, storage } from '../../../../../lib/config/firebaseConfig'
import getDateTime from './../../../../../lib/functions/getDateTime';
import Spacer from './../../../../../components/Utilities/Spacer/index';

const EditProfile = () => {
    const history = useHistory()
    const { currentUser, userData, setLoading, setShowAlert } = useAuthContext()
    const [selectedCountry, setSelectedCountry] = useState(countryData[0])
    const genderOptions = ['male', 'female', 'others']
    const privacyOptions = ['private', 'public']
    const [imageUrl, setImageUrl] = useState('')
    const [email, setEmail] = useState('')
    const [emailPrivacy, setEmailPrivacy] = useState('private')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phonePrivacy, setPhonePrivacy] = useState('private')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [instagram, setInstagram] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [bio, setBio] = useState('')
    const [interests, setInterests] = useState([])
    const [selectedInterests, setSelectedInterests] = useState([])
    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest))
        } else {
            setSelectedInterests([...selectedInterests, interest])
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading({
            status: true,
            text: 'Updating profile...'
        })
        // check first name
        if (firstName.length < 2) {
            setShowAlert({
                status: true,
                title: 'First name must be at least 2 characters long',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check last name
        if (lastName.length < 2) {
            setShowAlert({
                status: true,
                title: 'Last name must be at least 2 characters long',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check phone number
        if (phoneNumber.length < 10) {
            setShowAlert({
                status: true,
                title: 'Phone number must be at least 10 characters long',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check date of birth empty and age is 13 or older
        if (dateOfBirth === '') {
            setShowAlert({
                status: true,
                title: 'Date of birth is required',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check if age is 13 or older
        const date = new Date(dateOfBirth)
        const age = new Date().getFullYear() - date.getFullYear()
        if (age < 13) {
            setShowAlert({
                status: true,
                title: 'You must be at least 13 years old to use this app',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check empty selected interests
        if (selectedInterests.length === 0) {
            console.log('empty selected interests');
            setShowAlert({
                status: true,
                title: 'Please select at least one interest',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check bio
        if (bio.length > 80) {
            setShowAlert({
                status: true,
                title: 'Bio must be less than 80 characters long',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        // check empty gender
        if (gender === '') {
            setShowAlert({
                status: true,
                title: 'gender is required',
                variant: 'danger'
            })
            setLoading({
                status: false,
                text: ''
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: 'danger'
                })
            }, 2000)
            return
        }
        setTimeout(() => {
            db.collection('users').doc(currentUser.uid).set({
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth: new Date(dateOfBirth),
                bio,
                interests: selectedInterests,
                profileComplete: true,
                instagram,
                linkedin,
                gender,
                phonePrivacy,
                emailPrivacy
            }, { merge: true }).then(() => {

                setLoading({
                    status: false,
                    text: ''
                })
                setShowAlert({
                    status: true,
                    title: 'Profile updated successfully',
                    variant: 'success'
                })
                history.push('/profile')
                setTimeout(() => {
                    setShowAlert({
                        status: false,
                        title: '',
                        variant: 'success'
                    })
                }, 2000)

            }).catch(err => {
                console.log(err);
                setLoading({
                    status: false,
                    text: ''
                })
                setShowAlert({
                    status: true,
                    title: 'Error updating profile',
                    variant: 'danger'
                })
                setTimeout(() => {
                    setShowAlert({
                        status: false,
                        title: '',
                        variant: 'danger'
                    })
                }, 2000)
            })
        }, 1000)
    }
    const type = ['image/png', 'image/jpeg', 'image/jpg']
    const uploadImage = (e) => {
        let file = e.target.files[0]
        if (file) {
            if (type.includes(file.type)) {
                setLoading({
                    status: true,
                    text: 'Uploading image...'
                })
                const uploadTask = storage.ref(`users/${currentUser.uid}/${file.name}`).put(file)
                uploadTask.on('state_changed', (snapshot) => {
                    // progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    setLoading({
                        status: true,
                        text: `Uploading image... ${progress}%`
                    })
                }, (error) => {
                    // error function
                    console.log(error);
                    setLoading({
                        status: false,
                        text: ''
                    })
                    setShowAlert({
                        status: true,
                        title: 'Error uploading image',
                        variant: 'danger'
                    })
                    setTimeout(() => {
                        setShowAlert({
                            status: false,
                            title: '',
                            variant: 'danger'
                        })
                    }, 2000)
                }, () => {
                    // complete function
                    storage.ref(`users/${currentUser.uid}`).child(file.name).getDownloadURL().then(url => {
                        db.collection('users').doc(currentUser.uid).update({
                            profileImage: url
                        }, { merge: true }).then(() => {
                            setLoading({
                                status: false,
                                text: ''
                            })
                            setShowAlert({
                                status: true,
                                title: 'Profile image updated successfully',
                                variant: 'success'
                            })
                            setTimeout(() => {
                                setShowAlert({
                                    status: false,
                                    title: '',
                                    variant: 'success'
                                })
                            }, 2000)
                        }).catch(err => {
                            console.log(err);
                            setLoading({
                                status: false,
                                text: ''
                            })
                            setShowAlert({
                                status: true,
                                title: 'Error updating profile image',
                                variant: 'danger'
                            })
                            setTimeout(() => {
                                setShowAlert({
                                    status: false,
                                    title: '',
                                    variant: 'danger'
                                })
                            }, 2000)
                        })
                    })
                })
            } else {
                setLoading({
                    status: false,
                    text: ''
                })
                setShowAlert({
                    status: true,
                    title: 'Invalid file type',
                    variant: 'danger'
                })
                setTimeout(() => {
                    setShowAlert({
                        status: false,
                        title: '',
                        variant: 'danger'
                    })
                }, 2000)
            }
        }
    }
    useEffect(() => {
        setLoading({
            status: true,
            text: 'Loading profile data...'
        })
        db.collection('interests').onSnapshot(
            snapshot => {
                setInterests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                setLoading({
                    status: false,
                    text: ''
                })
            }
        )

        userData && userData.profileImage && setImageUrl(userData.profileImage)
        userData && userData.email && setEmail(userData.email)
        userData && userData.firstName && setFirstName(userData.firstName)
        userData && userData.lastName && setLastName(userData.lastName)
        userData && userData.phoneNumber && setPhoneNumber(userData.phoneNumber)
        userData && userData.dateOfBirth && setDateOfBirth(getDateTime(userData.dateOfBirth).inputDate)
        userData && userData.instagram && setInstagram(userData.instagram)
        userData && userData.linkedin && setLinkedin(userData.linkedin)
        userData && userData.bio && setBio(userData.bio)
        userData && userData.interests && setSelectedInterests(userData.interests)
        userData && userData.gender && setGender(userData.gender)
        userData && userData.phonePrivacy && setPhonePrivacy(userData.phonePrivacy)
    }, [userData, setLoading])
    return currentUser.emailVerified ? (
        <div className='editProfile'>
            <form className="basicInfo">
                <div className="imageUpload">
                    <div className="image">
                        <img src={imageUrl === '' ? '/assets/icons/avatar.png' : imageUrl} alt="profile" />
                    </div>
                    <div className="changeImage">
                        <input type="file" className='imageUploadBtn' onChange={uploadImage} />
                    </div>
                </div>
                <Spacer h='12px' />
                <div className="inputGroup">
                    <Input
                        id='firstName'
                        placeholder='first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="inputGroup">
                    <Input
                        id='lastName'
                        placeholder='last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="inputGroup">
                    {/* <div className="emoji">
                        <img
                            src='/assets/icons/gender.png'
                            alt='instagram'
                        />
                    </div> */}
                    <div className="select">
                        {
                            genderOptions.map((option, index) => (
                                <div
                                    onClick={() => setGender(option)}
                                    key={index}
                                    className={`option ${option === gender ? 'selected' : null}`}
                                >
                                    {option}
                                </div>
                            ))}
                    </div>
                </div>
                <Spacer h='12px' />
                <div className="inputGroup">
                    <div className="emoji">
                        <img
                            src='/assets/icons/email.png'
                            alt='email'
                        />
                    </div>
                    <Input
                        id='email'
                        placeholder='email'
                        value={email}
                        className='disabled'
                        required={true}
                        disabled={true}
                    />
                </div>
                <div className="inputGroup">
                    <div className="select">
                        {
                            privacyOptions.map((option, index) => (
                                <div
                                    onClick={() => setEmailPrivacy(option)}
                                    key={index}
                                    className={`option ${option === emailPrivacy ? 'selected' : null}`}
                                >
                                    {option}
                                </div>
                            ))}
                    </div>
                </div>
                <Spacer h='12px' />
                <div className="inputGroup">
                    <div className="emoji">
                        <img
                            src='/assets/icons/bday.png'
                            alt='birthday'
                        />
                    </div>
                    <Input
                        id='dob'
                        type='date'
                        placeholder='dob'
                        required={true}
                        value={dateOfBirth}
                        onChange={(e) => {
                            setDateOfBirth(e.target.value)
                        }}
                    />
                </div>
                <div className="inputGroup">
                    <Listbox className='countryCode' as='div' value={selectedCountry} onChange={setSelectedCountry}>
                        <Listbox.Button as='div' className='countryCodeButton'>
                            <div className="img">
                                <img src={selectedCountry.flag} alt="flag" />
                            </div>
                            <div className="name">
                                {selectedCountry.isoCode}&nbsp;({selectedCountry.dialCode})
                            </div>
                        </Listbox.Button>
                        <Listbox.Options className='countryCodeOptions'>
                            {countryData.map((data, index) => (
                                <Listbox.Option
                                    className='countryCodeOption'
                                    key={index}
                                    value={data}
                                >
                                    <div className='img'>
                                        <img src={data.flag} alt={data.name} />
                                    </div>
                                    <div className='text'>
                                        {data.name}&nbsp;({data.dialCode})
                                    </div>
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                    &nbsp;&nbsp;
                    <Input
                        id='phn'
                        placeholder='mobile number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="inputGroup">
                    <div className="select">
                        {
                            privacyOptions.map((option, index) => (
                                <div
                                    onClick={() => setPhonePrivacy(option)}
                                    key={index}
                                    className={`option ${option === phonePrivacy ? 'selected' : null}`}
                                >
                                    {option}
                                </div>
                            ))}
                    </div>
                </div>
                <Spacer h='12px' />
                <div className="inputGroup">
                    <div className="emoji">
                        <img
                            src='/assets/icons/insta.png'
                            alt='insta'
                        />
                    </div>
                    <div className="prefix">
                        @
                    </div>
                    <Input
                        id='insta'
                        type='text'
                        placeholder='username (optional)'
                        required={true}
                        value={instagram}
                        onChange={(e) => {
                            setInstagram(e.target.value)
                        }}
                    />
                </div>
                <div className="inputGroup">
                    <div className="emoji">
                        <img
                            src='/assets/icons/linkedin.png'
                            alt='linkedin'
                        />
                    </div>
                    <div className="prefix">
                        <Link size={14} />
                    </div>
                    <Input
                        id='linkedin'
                        type='text'
                        placeholder='linkedin profile link (optional)'
                        required={true}
                        value={linkedin}
                        onChange={(e) => {
                            setLinkedin(e.target.value)
                        }}
                    />
                </div>
                <Spacer h='24px' />
                <div className="interests">
                    <p className='contentL'>select your interests:</p>
                    <div className="interestPills">
                        {interests.map((interest, index) => {
                            if (selectedInterests.includes(interest.title)) {
                                return (
                                    <div
                                        className='interest selected'
                                        key={interest.id}
                                        onClick={() => toggleInterest(interest.title)}
                                    >
                                        {interest.title}
                                    </div>
                                )
                            }
                            return (
                                <div
                                    className='interest'
                                    key={interest.id}
                                    onClick={() => toggleInterest(interest.title)}
                                >
                                    {interest.title}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Spacer h='32px' />
                <p className='contentL'>add a bio:</p>
                <div className="inputGroup">
                    <Input
                        id='bio'
                        placeholder='add a bio 🌟 (optional)'
                        value={bio}
                        type='textarea'
                        onChange={(e) => setBio(e.target.value)}
                    />
                    &nbsp;&nbsp;
                    <div className={bio.length > 80 ? "wordCounter c-danger" : 'wordCounter'}>
                        {bio.length}/80
                    </div>
                </div>
                <Spacer h='8px' />
                <div className="inputGroup">
                    <Button
                        icon={<Save />}
                        title='update profile'
                        type='submit'
                        variant='primary'
                        onClick={handleSubmit}
                    />
                </div>
                <Spacer h='16px' />
            </form>
        </div>
    )
        : (
            <Redirect to='/verify-email' />
        )
}

export default EditProfile