import React from 'react'
import './style.css'
const Button = ({ title, variant, iconImg, icon, onClick, type = 'button', disabled = false }) => {
    return (
        <button disabled={disabled} type={type} className={`btn btn-${variant}`} onClick={onClick} >
            <div className="icon">
                {iconImg && <img src={iconImg} alt={title} />}
                {icon && icon}
            </div>

            {title}
        </button>
    )
}

export default Button
