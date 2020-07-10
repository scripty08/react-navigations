import React from 'react';
import ExpandDown from './expand-down.svg';

export const IconExpandDown = (props) => {
    const { size = 12 } = props;
    return <ExpandDown style={{width: size, height: size}} />;
};

export const IconExpandRight = (props) => {
    const { size = 12 } = props;
    return <ExpandDown style={{width: size, height: size, transform: 'rotate(270deg)'}} />;
};
