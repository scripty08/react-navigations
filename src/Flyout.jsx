import React from 'react';
import './Flyout.scss';
import { NavLink, matchPath } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { IconExpandDown, IconExpandRight } from './Icon';

export const Flyout = (props) => {

    let { routes, onClick, selectedKeys = [] } = props;

    const onItemClick = (key, selectedKeys) => {
        onClick(key, selectedKeys);
    }

    const renderMenuItem = ({ key, label, path, exact, selectedKeys }) => (
        <li key={key}>
            <NavLink onClick={onItemClick.bind(this, key, selectedKeys)} exact={exact} to={path}>
                {label}
            </NavLink>
        </li>
    );

    const renderMenu = (routes, parentPath = '', index = 0) => {

        selectedKeys = getActiveRoutes(routes, window.location, parentPath);


        return routes.map((route, idx) => {
            const { key, label, path, url, icon, submenu, exact } = route;
            const currentPath = parentPath + path;

            if (submenu) {

                const isActive = selectedKeys.includes(key);
                const activeClass = (isActive) ? 'dropbtn active' : 'dropbtn';

                let expandIcon =  <IconExpandRight/>;

                let item = 'item';
                if (index === 0) {
                    item = 'item-' + index;
                    expandIcon = <IconExpandDown/>;
                }

                index = index + 1;

                return (
                    <li key={key} className={'dropdown'}>
                        <a href="#" className={activeClass}>{label} {expandIcon}</a>
                        <ul className={item}>
                            {renderMenu(submenu, currentPath, index)}
                        </ul>
                    </li>
                );
            }

            return renderMenuItem({ key, label, path: currentPath, url, icon, exact, selectedKeys });
        })
    };

    return (
        <nav className={'flyout'}>
            <ul>
                {renderMenu(routes, '')}
            </ul>
        </nav>
    )
};

export const getActiveRoutes = (routes, location, parentPath = '') => {
    let activeRoutes = [];

    routes.forEach(route => {
        const currentPath = parentPath + route.path;

        const match = matchPath(location.pathname, {
            path: currentPath,
            exact: route.exact || false,
            strict: route.strict || false
        });

        if (match) {
            activeRoutes.push(route.key);
        }

        const subitem = route.submenu || route.group;

        if (subitem) {
            activeRoutes = [
                ...activeRoutes,
                ...getActiveRoutes(subitem, location, route.group ? parentPath : currentPath)
            ];
        }
    });

    return activeRoutes;
};

Flyout.defaultProps = {
    onClick: () => {},
};

Flyout.propTypes = {
    onClick: PropTypes.func,
};
