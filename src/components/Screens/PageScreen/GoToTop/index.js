import React from 'react'
import { ArrowUp } from 'react-feather';
import { useAuthContext } from '../../../../lib/contexts/AuthContext';
import './style.css'

const GoToTop = () => {
    const { showGoToTop, setShowGoToTop } = useAuthContext()
    // Show goToTop button on scroll down 100px
    window.addEventListener('scroll', () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setShowGoToTop(true)
        }
        else if (scrolled <= 100) {
            setShowGoToTop(false)
        }
    });
    // scroll to top function
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    return showGoToTop && (
        <div className="goToTop" onClick={scrollToTop}>
            <div >
                <ArrowUp size={22} />
            </div>
        </div>
    )
}

export default GoToTop
