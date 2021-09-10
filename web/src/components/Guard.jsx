import React from 'react';
import { Route, Redirect } from "react-router-dom";

const Guard = (
    { component: Component, token, user, ...rest }) => (
    <Route {...rest} render={(props) => (
        token
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default Guard;