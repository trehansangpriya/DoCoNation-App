import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom';
import Dashboard from './screens/User/AppScreen/Dashboard';
import AppRoute from './lib/routes/AppRoute';
import Profile from './screens/User/AppScreen/Profile';
import Explore from './screens/User/AppScreen/Explore';
import Network from './screens/User/AppScreen/Network';
import PageRoute from './lib/routes/PageRoute';
import DoCoCoins from './screens/User/PageScreen/DoCoCoins';
import Resources from './screens/Global/Resources';
import Events from './screens/Global/Events';
import { AnimatePresence } from 'framer-motion';
import ForgotPassword from './screens/Auth/ForgotPassword';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import RecordedEvents from './screens/Global/Events/RecordedEvents';
import Clubs from './screens/Global/Clubs';
import Club from './screens/Global/Clubs/Club';
import MyResources from './screens/User/PageScreen/MyResources';
import EditProfile from './screens/User/AppScreen/Profile/EditProfile';
import ViewResources from './screens/Global/Resources/ViewResources';
import FullScreenRoute from './lib/routes/FullScreenRoute';
import VerifyEmail from './screens/Auth/VerifyEmail';
import Requests from './screens/User/PageScreen/Requests';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        {/* Auth Screens */}
        <Route path="/signup" component={SignUp} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/forgot-password" component={ForgotPassword} exact />

        {/* User Specific Screens */}
        <FullScreenRoute path="/verify-email" component={VerifyEmail} exact />
        <AppRoute path="/" component={Dashboard} exact />
        <AppRoute path="/network" component={Network} exact />
        <AppRoute path="/profile" component={Profile} exact />
        <FullScreenRoute path="/edit-profile" title='edit profile' component={EditProfile} exact />
        <PageRoute path="/dococoins" title='dococoins' component={DoCoCoins} exact />
        <PageRoute path="/my-resources" title='my resources' component={MyResources} exact />
        <PageRoute path="/network/requests" component={Requests} exact />


        {/* Global Screens */}
        <AppRoute path="/explore" component={Explore} exact />
        <PageRoute path="/resources" title='resources' component={Resources} exact />
        <PageRoute path="/resources/:category" component={ViewResources} />
        <PageRoute path="/events/recorded-events" title='recorded events' component={RecordedEvents} exact />
        <PageRoute path="/events" title='events' component={Events} exact />
        <PageRoute path="/clubs" title='clubs' component={Clubs} exact />
        <PageRoute path="/clubs/:club" title='' component={Club} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;