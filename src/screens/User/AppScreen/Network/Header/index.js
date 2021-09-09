import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';
const NetworkHeader = ({ count }) => {
    return (
        <div className="networkHeader">
            <Link to='/network/requests' className="networkBtn">
                <span>pending requests ({count})</span>
                <span className='count'>&gt;</span>
            </Link>
        </div>
    )
}

export default NetworkHeader
