import React from 'react'
import { useAuthContext } from '../contexts/AuthContext';
import { Route, Redirect } from 'react-router-dom';
import AppScreen from '../../components/Screens/AppScreen';


const AppRoute = ({ component: Component }, ...rest) => {
    const { currentUser } = useAuthContext()
    return (
        <Route
            {...rest}
            render={props => {
                return (
                    (currentUser)
                        ?
                        (currentUser.emailVerified ?
                            (
                                <AppScreen>
                                    <Component {...props} />
                                </AppScreen>)
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

export default AppRoute