import React from 'react'
import { Menu } from 'react-feather'
import './style.css'
import { useAuthContext } from './../../../../lib/contexts/AuthContext';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Header = () => {
    const { navOpen, setNavOpen, dococoins } = useAuthContext()
    return (
        <div className='header'>
            <div className="icon" onClick={e => (setNavOpen(!navOpen))}>
                <Menu size={28} />
            </div>
            <div className="items">
                <Link to='/dococoins' >
                    <div className="item">
                        <div className="dococoin contentS">
                            <div className="dococoinIcon">
                                <img src="/assets/icons/dococoin.png" alt="DoCoCoin" />
                            </div>
                            {dococoins}
                        </div>
                    </div>
                </Link>
                {/*
                <div className="item">
                    <div className="docostore">
                        <ShoppingCart size={28} />
                    </div>
                </div>
                */}
            </div>
            <Sidebar />
        </div>
    )
}

export default Header
