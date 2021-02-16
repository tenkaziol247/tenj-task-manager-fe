import React from 'react';

import { Auth } from './Auth';
import { Home } from './Home';
import { Logout } from './Logout';

export interface IRoute {
    path: string;
    exact: boolean;
    routePublic: boolean;
    component: React.Component | React.FC;
    special: boolean;
}

export const routes: IRoute[] = [
    {
        path: '/auth',
        exact: false,
        routePublic: true,
        component: Auth,
        special: true,
    },
    {
        path: '/logout',
        exact: true,
        routePublic: false,
        component: Logout,
        special: false,
    },
    {
        path: '/',
        exact: true,
        routePublic: false,
        component: Home,
        special: false,
    },
];
