import React from 'react';
import './Navigations.scss';
import { NavLink } from 'react-router-dom';
import * as PropTypes from 'prop-types';

export const Navigations = (props) => {

    const { routes, onClick } = props;

    const renderMenuItem = ({ key, label, path, exact }) => (
        <li key={key}>
            <NavLink onClick={onClick.bind(null, key)} exact={exact} to={path}>
                {label}
            </NavLink>
        </li>
    );

    const renderMenu = (routes, parentPath = '') => (
        routes.map(route => {
            const { key, label, path, url, icon, submenu, exact } = route;
            const currentPath = parentPath + path;

            if (submenu) {
                return (
                    <li key={key} className={'dropdown'}>
                        <a href="#" className="dropbtn">{label} ^</a>
                        <ul className="dropdown-content">
                            {renderMenu(submenu, currentPath)}
                        </ul>
                    </li>
                );
            }

            return renderMenuItem({ key, label, path: currentPath, url, icon, exact });
        })
    );

    return (
        <ul className={'menu'}>
            {renderMenu(routes, '')}
        </ul>
    )
};

Navigations.defaultProps = {
    onClick: () => {},
};

Navigations.propTypes = {
    onClick: PropTypes.func,
};
