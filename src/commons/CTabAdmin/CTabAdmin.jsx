import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './CTabAdmin.scss';

export const CTabAdmin = ({ name, value, path, isActive }) => {
	return (
		<Link
			className={`tab-admin-common ${isActive ? 'active' : ''}`}
			to={{
				pathname: path,
				search: value,
			}}
		>
			{name}
		</Link>
	);
};

CTabAdmin.propTypes = {
	name: PropTypes.string,
	path: PropTypes.string,
	value: PropTypes.string,
	isActive: PropTypes.bool,
};
