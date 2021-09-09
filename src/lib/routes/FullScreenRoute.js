import React from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { Route, Redirect, useLocation } from 'react-router-dom';
import FullScreen from '../../components/Screens/FullScreen';


const FullScreenRoute = ({ component: Component, title, path }, ...rest) => {
    const { currentUser } = useAuthContext()
    const location = useLocation().pathname.split('/')
    const page = location[location.length - 1]
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                return (
                    (currentUser)
                        ?
                        (
                            <FullScreen title={title || page}>
                                <Component {...props} />
                            </FullScreen>)
                        :
                        <Redirect to='/login' />
                )
            }}
        />
    )
}

export default FullScreenRoute

