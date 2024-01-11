import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

export const CategorySlideItem = ({ image, name, href }) => {
	return (
		<div className="category-slider__img__item">
			<LazyLoad once offset={100}>
				<img
					src={image}
					alt=""
					className="category-slider__img__item--image"
				/>
			</LazyLoad>

			<Link to={href}>
				<h4 className="category-slider__img__item--title">{name}</h4>
			</Link>
		</div>
	);
};

CategorySlideItem.propTypes = {
	image: PropTypes.string,
	href: PropTypes.string,
	name: PropTypes.string,
};

CategorySlideItem.defaultProps = {
	href: '/something',
	name: 'Tên danh mục gồm khoảng 2 dòng',
	image: '/assets/images/homepage/bg_big.png',
};
