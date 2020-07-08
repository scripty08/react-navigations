import React from 'react';
import './Flyout.scss';
import { NavLink, matchPath } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { IconExpandDown } from './Icon';

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

    const renderMenu = (routes, parentPath = '') => {

        selectedKeys = getActiveRoutes(routes, window.location, parentPath);

        return routes.map(route => {
            const { key, label, path, url, icon, submenu, exact } = route;
            const currentPath = parentPath + path;

            if (submenu) {

                const isActive = selectedKeys.includes(key);
                const activeClass = (isActive) ? 'dropbtn active' : 'dropbtn';

                return (
                    <li key={key} className={'dropdown'}>
                        <a href="#" className={activeClass}>{label} <IconExpandDown/></a>
                        <ul className="dropdown-content">
                            {renderMenu(submenu, currentPath)}
                        </ul>
                    </li>
                );
            }

            return renderMenuItem({ key, label, path: currentPath, url, icon, exact, selectedKeys });
        })
    };

    return (
        <ul className={'flyout'}>
            {renderMenu(routes, '')}
        </ul>
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
