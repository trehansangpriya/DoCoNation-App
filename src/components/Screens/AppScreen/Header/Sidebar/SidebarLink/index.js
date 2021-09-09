import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'
import { useAuthContext } from './../../../../../../lib/contexts/AuthContext';


const SidebarLink = ({ icon, title, path }) => {
    const { setNavOpen } = useAuthContext()
    return (
        <NavLink
            className={`sidebarLink`}
            to={path}
            activeClassName="active"
            onClick={e => (setNavOpen(false))}
        >
            <div className="title">
                {title}
            </div>
            <div className="icon">
                {icon}
            </div>
        </NavLink>
    )
}

export default SidebarLink
