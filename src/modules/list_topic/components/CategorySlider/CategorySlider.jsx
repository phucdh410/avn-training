import './CategorySlider.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { RESPONSIVE_SIZE } from 'src/configs/responsive.config';

import { CSlider } from 'src/commons';

import { CategorySlideItem } from '..';

import { getLinkImage } from 'src/utils/function.util';

const responsive = [
	{
		breakpoint: RESPONSIVE_SIZE.XL2,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 2,
		},
	},
	{
		breakpoint: RESPONSIVE_SIZE.XL,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
		},
	},
	{
		breakpoint: RESPONSIVE_SIZE.MD,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
		},
	},
	{
		breakpoint: RESPONSIVE_SIZE.SM,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		},
	},
];

export const CategorySlider = ({ data }) => {
	return (
		<div className="category-slider">
			<div className="category-slider__img">
				<CSlider
					className="category-slider__img__list"
					slidesToShow={5}
					slidesToScroll={1}
					responsive={responsive}
				>
					{data?.map((category, index) => (
						<CategorySlideItem
							key={index}
							name={category?.name}
							href={`/topic/${category?.slug}`}
							description={category?.description}
							image={getLinkImage(
								category?.banner
									? category.banner?.path
									: category?.file?.path,
							)}
						/>
					))}
				</CSlider>
			</div>
		</div>
	);
};

CategorySlider.propTypes = {
	data: PropTypes.any,
};
