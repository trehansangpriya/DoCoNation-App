import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div
            style={{
                width: '100%',
                minHeight: 'calc(100vh - 180px)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <h1 className='headingL c-primary'>
                Error 404
            </h1>
            <p className='contentXL'>
                Looking for something?
                Well, you're lost.
                <br />
                <br />
                Here, is a button that can help you find your way back home.
            </p>
            <br />
            <Link to='/' className='btn btn-primary'>Button</Link>
        </div>
    )
}

export default ErrorPage
