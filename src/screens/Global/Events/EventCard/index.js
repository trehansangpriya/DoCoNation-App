import React from 'react'
import './style.css'
import Button from '../../../../components/Utilities/Button';
const EventCard = ({ id, image, title, subtitle, link, date, time, tags, status }) => {
    return (
        <div className='eventCard' >
            <div className='eventCardImage'>
                <img src={image} alt={title} />
            </div>
            <div className='eventCardContent'>
                <div className='eventCardContentInfo c-primary'>
                    {date}, {time}
                </div>
                <div className='eventCardContentTitle'>
                    <h3 className='contentM'>{title} <br /> {subtitle}</h3>
                </div>
                <div className='eventCardButtons'>
                    {status === 'Published'
                        ? (
                            <a
                                href='https://doco.link/nation-whatsapp'
                                target='_blank'
                                rel="noreferrer"
                            >
                                <Button
                                    title='get notified'
                                    variant='secondary'
                                />
                            </a>

                        ) : <a
                            href={link}
                            target='_blank'
                            rel="noreferrer"
                        >
                            <Button
                                title='watch live'
                                variant='secondary'
                            />
                        </a>
                    }
                </div>
            </div>
        </div >
    )
}

export default EventCard