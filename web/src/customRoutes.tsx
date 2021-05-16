import * as React from "react";
import { Route } from 'react-router-dom';
import Register from './register';

export const Routes = [
    <Route exact path="/register" component={Register} />
];
