import React from 'react'
import Tile from '../../../../components/Utilities/Tile';
import './style.css'

const tiles = [
    {
        title: 'Events',
        icon: '/assets/icons/event.png',
        link: '/events'
    },
    {
        title: 'Resources',
        icon: '/assets/icons/resource.png',
        link: '/resources'
    },
    {
        title: 'Clubs',
        icon: '/assets/icons/club.png',
        link: '/clubs'
    },
]

const Explore = () => {
    return (
        <div className='explore'>
            <h1>explore</h1>
            <div className="exploreTiles">
                {tiles.map((tile, index) => {
                    return (
                        <Tile
                            title={tile.title}
                            icon={tile.icon}
                            link={tile.link}
                            key={index}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Explore
