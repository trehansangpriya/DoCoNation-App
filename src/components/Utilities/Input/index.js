import React from 'react'
import './style.css'
const Input = ({ type = 'text', className = '', placeholder, onKeyUp, onKeyDown, onKeyPress, id, required = false, value, onChange, disabled = false, style }) => {
    if (type !== 'textarea') {
        return required ? (
            <input className={'input content ' + className} value={value} onChange={onChange} type={type} placeholder={placeholder} id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onKeyPress={onKeyPress} required disabled={disabled} style={style} />
        ) :
            (
                <input className={'input content ' + className} value={value} onChange={onChange} type={type} placeholder={placeholder} id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onKeyPress={onKeyPress} disabled={disabled} style={style} />
            )
    } else {
        return required ? (
            <textarea className={'input content ' + className} value={value} onChange={onChange} placeholder={placeholder} id={id} onKeyUp={onKeyUp} onKeyDown={onKeyDown} disabled={disabled} onKeyPress={onKeyPress} required style={style} />
        ) :
            (
                <textarea className={'input content ' + className} value={value} onChange={onChange} placeholder={placeholder} id={id} disabled={disabled} onKeyUp={onKeyUp} onKeyDown={onKeyDown} onKeyPress={onKeyPress} style={style} />
            )
    }
}

export default Input