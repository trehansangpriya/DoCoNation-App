import React from 'react'
import './style.css'
import Spacer from './../../../../components/Utilities/Spacer/index';
const ContactUs = () => {
    return (
        <div className='contact'>
            <Spacer h='16px' />
            <div className='contactCard'>
                <h2 className="headingS">
                    found a bug?
                </h2>
                <Spacer h='12px' />
                <p className="paragraph">
                    If you find a bug in the application, please report it to us by emailing us at&nbsp;<a
                        className="link c-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:hey@doconation.com"
                        style={{
                            fontWeight: '600',
                        }}
                    >
                        hey@doconation.com
                    </a>&nbsp;or by messaging on our&nbsp;<a
                        className="link c-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://discord.gg/79s29jzYGg"
                        style={{
                            fontWeight: '600',
                        }}
                    >
                        Discord Server(#🐞report-bugs)
                    </a>
                </p>
            </div>
            <div className="contactCard">
                <h2 className="headingS">
                    have a feature request?
                </h2>
                <Spacer h='12px' />
                <p className="paragraph">
                    If you have a feature request, please let us know by emailing us at&nbsp;<a
                        className="link c-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:hey@doconation.com"
                        style={{
                            fontWeight: '600',
                        }}
                    >
                        hey@doconation.com</a>&nbsp;or by messaging on our&nbsp;<a
                            className="link c-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://discord.gg/gz4qwna7DR"
                            style={{
                                fontWeight: '600',
                            }}
                        >
                        Discord Server(#✅feature-requests)
                    </a>
                </p>
            </div>
        </div>
    )
}

export default ContactUs
