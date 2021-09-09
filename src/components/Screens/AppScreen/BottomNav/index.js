import React from 'react'
import navLinks from '../../../../data/bottomNavLinks'
import { NavLink } from 'react-router-dom'
import './style.css'
import { useAuthContext } from './../../../../lib/contexts/AuthContext';

const BottomNav = () => {
    const { setNavOpen } = useAuthContext()
    return (
        <div className='bottomNav'>
            {navLinks.map(({ name, icon, path }, index) => (
                <NavLink
                    exact
                    key={index}
                    to={path}
                    className='bottomNavLink contentXS'
                    activeClassName='active'
                    onClick={() => setNavOpen(false)}
                >
                    {icon}
                    {name}
                </NavLink>
            ))}
        </div>
    )
}

export default BottomNav