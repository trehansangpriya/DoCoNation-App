import React from 'react'
import * as Icon from 'react-feather'
import './style.css'
import { useAuthContext } from './../../../../../lib/contexts/AuthContext';
import SidebarLink from './SidebarLink';
import sidebarLinks from '../../../../../data/sidebarLinks';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { navOpen, setNavOpen, logOut, setShowAlert, setLoading } = useAuthContext()
    const handleLogout = () => {
        setNavOpen(false)
        setLoading({
            status: true,
            text: "logging out..."
        })
        setTimeout(() => {
            logOut()
            setLoading({
                status: false,
                text: ""
            })
            setShowAlert({
                status: true,
                title: 'logged out',
                variant: 'success'
            })
            setTimeout(() => {
                setShowAlert({
                    status: false,
                    title: '',
                    variant: ''
                })
            }, 1000)
        }, 2000)
    }

    return (
        <div className={navOpen ? 'sidebar open' : 'sidebar'} >
            <div className='sidebarHeader'>
                <div className='sidebarLogo'>
                    <Link to='/'>
                        <img src='/assets/images/logo.png' alt='logo' />
                    </Link>
                </div>
                <div className="closeIcon" onClick={e => (setNavOpen(false))}>
                    <Icon.X size={28} />
                </div>
            </div>
            <hr />
            <div className='sidebarLinks'>
                {sidebarLinks.map(({ icon, path, title }, index) => (
                    <SidebarLink
                        key={index}
                        title={title}
                        icon={icon}
                        path={path}
                    />
                ))}
            </div>
            <hr />
            <div className="sidebarControls">
                <div className="sidebarLink danger" onClick={handleLogout}>
                    <div className="title">
                        logout
                    </div>
                    <div className="icon">
                        <Icon.LogOut />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar