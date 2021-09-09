import React from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PageScreen from '../../components/Screens/PageScreen';


const PageRoute = ({ component: Component, title, path }, ...rest) => {
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
                        (currentUser.emailVerified ?
                            (
                                <PageScreen title={title || page}>
                                    <Component {...props} />
                                </PageScreen>)
                            : (
                                <Redirect to='verify-email' />
                            )
                        )
                        :
                        <Redirect to='/login' />
                )
            }}
        />
    )
}

export default PageRoute
