import React from 'react';
import { Route, Navigate } from "react-router-dom";

/* from: https://blog.netcetera.com/how-to-create-guarded-routes-for-your-react-app-d2fe7c7b6122 */
const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth() === true
            ? <Component {...props} />
            : <Navigate to='/' />
    )} />
)

export default GuardedRoute;