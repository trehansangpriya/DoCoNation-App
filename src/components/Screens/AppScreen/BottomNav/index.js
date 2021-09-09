import React from 'react'
import navLinks from '../../../../data/bottomNavLinks'
import { NavLink } from 'react-router-dom'
import './style.css'

const BottomNav = () => {
    return (
        <div className='bottomNav'>
            {navLinks.map(({ name, icon, path }, index) => (
                <NavLink
                    exact
                    key={index}
                    to={path}
                    className='bottomNavLink contentXS'
                    activeClassName='active'
                >
                    {icon}
                    {name}
                </NavLink>
            ))}
        </div>
    )
}

export default BottomNav