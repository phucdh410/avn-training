import React from 'react';
import PropTypes from 'prop-types';
import './CTopicGrid.scss';

export const CTopicGrid = props => {
	return <div className="topic-grid">{props.children}</div>;
};

CTopicGrid.propTypes = {
	children: PropTypes.any,
};
