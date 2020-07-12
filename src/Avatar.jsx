import React from 'react';
import * as PropTypes from 'prop-types';
import img from './avatar-male.png';
import './Avatar.scss';

export const Avatar = (props) => {
    const { user } = props;
    console.log(user, ' ss <------------');
    const { avatar, alt, gender } = user;
    const { url } = avatar;

    return <img src={(url) ? url : img} alt={alt} width={50} className="avatar" />
};

Avatar.defaultProps = {
    url: './avatar-male.png',
    alt: 'Avatar',
    gender: 'male'
};

Avatar.propTypes = {
    url: PropTypes.string,
    alt: PropTypes.string,
    gender: PropTypes.string
};
