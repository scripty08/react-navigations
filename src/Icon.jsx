import React from 'react';
import ExpandDown from './expand-down.svg';
import Home from './home.svg';

export const IconHome = (props) => {
    const { size = 17, onClick } = props;
    return <Home onClick={onClick} style={{width: size, height: size, cursor:'pointer'}} />;
};

export const IconExpandDown = (props) => {
    const { size = 12 } = props;
    return <ExpandDown style={{width: size, height: size}} />;
};

export const IconExpandRight = (props) => {
    const { size = 12 } = props;
    return <ExpandDown style={{width: size, height: size, transform: 'rotate(270deg)'}} />;
};
