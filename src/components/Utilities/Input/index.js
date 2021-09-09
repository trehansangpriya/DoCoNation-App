import React from 'react'
import './style.css'
const Input = ({ type = 'text', className = '', placeholder, onKeyUp, onKeyDown, onKeyPress, id, required = false, value, onChange, disabled = false }) => {
    if (type !== 'textarea') {
        return required ? (
            <input className={'input content ' + className} value={value} onChange={onChange} type={type} placeholder={placeholder} id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onKeyPress={onKeyPress} required disabled={disabled} />
        ) :
            (
                <input className={'input content ' + className} value={value} onChange={onChange} type={type} placeholder={placeholder} id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onKeyPress={onKeyPress} disabled={disabled} />
            )
    } else {
        return required ? (
            <textarea className={'input content ' + className} value={value} onChange={onChange} placeholder={placeholder} id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown} disabled={disabled} onKeyPress={onKeyPress} required />
        ) :
            (
                <textarea className={'input content ' + className} value={value} onChange={onChange} placeholder={placeholder} id={id} disabled={disabled} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onKeyPress={onKeyPress} />
            )
    }
}

export default Input