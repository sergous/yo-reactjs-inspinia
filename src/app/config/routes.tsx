/// <reference path='../../../typings/index.d.ts' />

import * as React from 'react';
import Main from '../components/layouts/Main';
import Todo from '../components/layouts/Todo';

import MainView from '../views/Main';
import MinorView from '../views/Minor';

import { Route, Router, IndexRedirect, hashHistory} from 'react-router';

export default (
    <Router history={hashHistory}>
        <Route path='/' component={Main}>
            <IndexRedirect to='/main' />
            <Route path='main' component={MainView}> </Route>
            <Route path='minor' component={MinorView}> </Route>
            <Route path='todo' component={Todo}> </Route>
        </Route>
    </Router>

);
