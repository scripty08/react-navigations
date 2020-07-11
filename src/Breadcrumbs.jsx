import React, { Fragment } from 'react';
import './Breadcrumbs.scss';
import { IconExpandDown, IconExpandRight, IconHome } from './Icon';
import { getActiveRoutes, getSelectedKeys } from './helper';
import { NavLink } from 'react-router-dom';

export const Breadcrumbs = (props) => {

    let { routes, onClick, selectedKeys } = props;

    const onItemClick = (key, selectedKeys) => {
        onClick(key, selectedKeys);
    }

    const activeRoutes = getActiveRoutes(routes, window.location, '');


    const links = activeRoutes.map((route, idx) => {
        let path = route.currentPath;
        let pathClass = '';

        selectedKeys = getSelectedKeys(routes, window.location, '');

        if (route.path === '#' || idx === activeRoutes.length -1) {
            path = '#';
            pathClass = 'no-link'
        }

        return (
            <li key={route.key}>
                <NavLink className={pathClass} onClick={onItemClick.bind(null, route.key, selectedKeys)} exact={route.exact} to={path}>
                    {route.label}
                </NavLink>
            </li>
        );
    });

    return (
        <nav className={'breadcrumbs'}>
            <ul>
                {links}
            </ul>
        </nav>
    );
};
