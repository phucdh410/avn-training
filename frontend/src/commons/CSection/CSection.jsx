import React from 'react';
import PropTypes from 'prop-types';
import './CSection.scss';

export const CSection = props => {
	return <div className={`section ${props.className}`}>{props.children}</div>;
};

CSection.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};
