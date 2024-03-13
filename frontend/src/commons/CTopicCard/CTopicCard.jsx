import './CTopicCard.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

export const CTopicCard = ({
	className,
	image,
	title,
	description,
	href,
	type,
}) => {
	return (
		<div className={`topic-card ${className} ${type || ''}`}>
			<LazyLoad once offset={100}>
				<img src={image} alt={title} />
			</LazyLoad>

			<Link to={href}>
				<h4 className="normal-topic__post__title">{title}</h4>
			</Link>
			{description ? (
				<p className="normal-topic__post__desc">{description}</p>
			) : null}
			{/* <p className="normal-topic__post__desc">{description}</p> */}
		</div>
	);
};

CTopicCard.propTypes = {
	children: PropTypes.any,
	className: PropTypes.any,
	image: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	href: PropTypes.string,
	type: PropTypes.string,
};

CTopicCard.defaultProps = {
	image: '/assets/images/homepage/lib1.png',
	title: 'Tiêu đề chủ đề đào tạo khoảng 2 dòng',
	href: '/something',
};
