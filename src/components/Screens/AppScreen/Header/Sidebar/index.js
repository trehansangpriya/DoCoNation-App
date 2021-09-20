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
            <hr />
            <div className="sidebarDetails">
                <p className='content'>join community</p>
                <div className="icons">
                    <a href="https://doco.link/discord"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/discord.png" alt="discord" width='32px' />
                    </a>
                    <a href="https://doco.link/nation-whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/whatsapp.png" alt="whatsapp" width='32px' />
                    </a>
                    <a href="https://doco.link/nation-telegram"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/telegram.png" alt="telegram" width='32px' />
                    </a>
                </div>
                <p className='content'>socials</p>
                <div className="icons">
                    <a href="https://twitter.com/doconation"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/twitter.png" alt="twitter" width='32px' />
                    </a>
                    <a href="https://www.instagram.com/doconation"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/insta.png" alt="instagram" width='32px' />
                    </a>
                    {/*linkedin  */}
                    <a href="https://www.linkedin.com/company/doconation"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/linkedin.png" alt="linkedin" width='32px' />
                    </a>
                    {/* youtube */}
                    <a href="https://www.youtube.com/c/DoCoNation"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/icons/youtube.png" alt="youtube" width='32px' />
                    </a>
                </div>
            </div>

        </div>
    )
}

export default Sidebar