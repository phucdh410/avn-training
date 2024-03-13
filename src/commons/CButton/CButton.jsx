import React from 'react';
import PropTypes from 'prop-types';
import './CButton.scss';

export const CButton = props => {
	return (
		<button
			className={`button ${props.className}`}
			onClick={props.onClick ? () => props.onClick() : null}
		>
			{props.children}
		</button>
	);
};

export const CButtonTopic = props => {
	return (
		<button
			className={`btn-tp ${props.className}`}
			onClick={props.onClick ? () => props.onClick() : null}
		>
			{props.children}
		</button>
	);
};

CButton.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.any,
	className: PropTypes.any,
};
CButtonTopic.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.any,
	className: PropTypes.any,
};
