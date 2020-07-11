import React from 'react';
import './Flyout.scss';
import { NavLink, matchPath } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { IconExpandDown, IconExpandRight } from './Icon';
import { getAntdIcon } from './AntdIcons';
import { getSelectedKeys } from './helper';

export const FlyoutWithIcons = (props) => {

    let {
        routes,
        onClick,
        selectedKeys,
        color,
        width,
        height,
        style,
    } = props;

    const onItemClick = (key, selectedKeys) => {
        onClick(key, selectedKeys);
    }

    const renderMenuItem = ({ key, label, path, exact, selectedKeys, icon }) => (
        <li key={key}>
            <NavLink onClick={onItemClick.bind(null, key, selectedKeys)} exact={exact} to={path}>
                <span className={'icon'}>{icon}</span> {label}
            </NavLink>
        </li>
    );

    const renderMenu = (routes, parentPath = '', index = 0) => {
        return routes.map((route) => {
            const { key, label, path, url, icon, submenu, exact } = route;
            const currentPath = parentPath + path;
            const antIcon = getAntdIcon(icon);

            selectedKeys = getSelectedKeys(routes, window.location, parentPath);

            const isActive = selectedKeys.includes(key);
            const activeClass = (isActive) ? 'dropbtn active' : 'dropbtn';

            if (submenu) {

                let expandIcon =  <IconExpandRight/>;

                let item = 'item';
                if (index === 0) {
                    item = 'item-' + index;
                    expandIcon = <IconExpandDown/>;
                }

                index = index + 1;

                return (
                    <li key={key} className={'dropdown'}>
                        <NavLink onClick={onItemClick.bind(null, key, selectedKeys)} className={activeClass} to={currentPath}>
                            <span className={'icon'}>{antIcon}</span> {label} <span className={'arrow'}>{expandIcon}</span>
                        </NavLink>
                        <ul className={item}>
                            {renderMenu(submenu, currentPath, index)}
                        </ul>
                    </li>
                );
            }

            return renderMenuItem({ key, label, path: currentPath, url, icon: antIcon, exact, selectedKeys });
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

FlyoutWithIcons.defaultProps = {
    onClick: () => {},
    routes: [],
    color: {
        backgroundColor: '',
        backgroundHoverColor: '',
        fontColor: '',
        fontHoverColor: ''
    },
    selectedKeys: [],
    width: '100%',
    height: '59px',
    style: {}
};

FlyoutWithIcons.propTypes = {
    routes: PropTypes.array,
    onClick: PropTypes.func,
    color: PropTypes.object,
    selectedKeys: PropTypes.array,
    width: PropTypes.string,
    height: PropTypes.string,
    style: PropTypes.object
};
