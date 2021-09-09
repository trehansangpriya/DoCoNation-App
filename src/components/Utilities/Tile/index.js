import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const Tile = ({ title, icon, link }) => {
    return (
        <Link to={link} className='tile'>
            <div className='tileIcon'>
                <img src={icon} alt='icon' />
            </div>
            <div className='tileTitle'>
                {title}
            </div>
        </Link>
    )
}

export default Tile