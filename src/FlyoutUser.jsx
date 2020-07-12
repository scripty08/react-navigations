import React from 'react';
import './Flyout.scss';
import { NavLink } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { IconExpandDown, IconExpandRight } from './Icon';
import { getSelectedKeys } from './helper';
import { Avatar } from './Avatar';

export const FlyoutUser = (props) => {

    let {
        routes,
        onClick,
        selectedKeys,
        user,
        loginPath
    } = props;

    const { loggedIn } = user;

    const onItemClick = (key, selectedKeys) => {
        onClick(key, selectedKeys);
    }

    const renderMenuItem = ({ key, label, path, exact, selectedKeys, icon }) => (
        <li key={key}>
            <NavLink onClick={onItemClick.bind(null, key, selectedKeys)} exact={exact} to={path}>
                {label}
            </NavLink>
        </li>
    );

    const renderMenu = (routes, parentPath = '', index = 0, user) => {
        return routes.map((route) => {
            let { key, label, path, url, icon, submenu, exact } = route;
            const currentPath = parentPath + path;

            selectedKeys = getSelectedKeys(routes, window.location, parentPath);

            const isActive = selectedKeys.includes(key);
            const activeClass = (isActive) ? 'dropbtn active' : 'dropbtn';

            if (submenu) {

                let expandIcon = <IconExpandRight/>;

                let item = 'item';
                if (index === 0) {

                    expandIcon = '';

                    if (loggedIn) {
                        label = <Avatar user={user}/>
                        expandIcon = <IconExpandDown/>;
                    }

                    item = 'item-' + index;
                }

                index = index + 1;

                return (
                    <li key={key} className={'dropdown'}>
                        <NavLink className={activeClass} to={path}>
                            {label} <span className={'arrow'}>{expandIcon}</span>
                        </NavLink>
                        <ul className={item}>
                            {renderMenu(submenu, currentPath, index, user)}
                        </ul>
                    </li>
                );
            }

            return renderMenuItem({ key, label, path: currentPath, url, icon, exact, selectedKeys });
        })
    };

    const getLoginMenu = () => {
        return (
            <ul>
                <li>
                    <NavLink to={loginPath}> Login </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav className={'flyout'}>
            <ul>
                {(loggedIn) ? renderMenu(routes, '', 0, user) : getLoginMenu()}
            </ul>
        </nav>
    )
};

FlyoutUser.defaultProps = {
    onClick: () => {},
    routes: [],
    selectedKeys: [],
    width: '100%',
    height: '59px',
    style: {},
    user: { loggedIn: false }
};

FlyoutUser.propTypes = {
    routes: PropTypes.array,
    onClick: PropTypes.func,
    selectedKeys: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string,
    style: PropTypes.object,
    user: PropTypes.object
};
