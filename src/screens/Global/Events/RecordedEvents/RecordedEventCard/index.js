import React from 'react'
import './style.css'
import { motion } from 'framer-motion';

const RecordedEventCard = ({ event }) => {
    // const videoId = event.link.slice(-11)
    return (
        <motion.a layout href={event.link} target='_blank' rel="noreferrer" className="pastEventsCard" key={event.id}>
            {/* <div className="pastEventsCardEmbed">
                <iframe width='100%' height='250px' src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            </div> */}
            <motion.div layout className="pastEventsCardImage">
                <img src={event.image} alt={event.title} />
            </motion.div>
            <motion.div layout className="pastEventsCardContent">
                <div className="pastEventsCardTitle">
                    {event.title}
                </div>
                <div className="pastEventsCardSubtitle">
                    {event.subtitle}
                </div>
            </motion.div>
            <motion.div layout className="pastEventsCardTags">
                {event.tags.map(tag => (
                    <div className="pastEventsCardTag" key={tag}>
                        {tag}
                    </div>
                ))}
            </motion.div>
        </motion.a>
    )
}

export default RecordedEventCard