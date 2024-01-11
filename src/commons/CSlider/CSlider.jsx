import './CSlider.scss';

import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import { ReactComponent as ArrowLeft } from 'src/assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';

// eslint-disable-next-line react/prop-types
const PrevButton = ({ className, style, onClick }) => (
	<button type="button" className={className} style={style} onClick={onClick}>
		<ArrowLeft />
	</button>
);

// eslint-disable-next-line react/prop-types
const NextButton = ({ className, style, onClick }) => (
	<button type="button" className={className} style={style} onClick={onClick}>
		<ArrowRight />
	</button>
);

const defaultConfig = {
	dots: true,
	infinite: true,
	lazyLoad: true,
	speed: 500,
	mobileFirst: true,
};

export const CSlider = ({
	children,
	slidesToShow,
	slidesToScroll,
	responsive,
	prevArrow,
	nextArrow,
	className,
}) => {
	const mapResponsive = useCallback(
		({ breakpoint, settings }) => {
			return {
				breakpoint,
				settings: {
					...settings,
					slidesToShow: Math.min(
						settings.slidesToShow,
						children?.length,
					),
					slidesToScroll: Math.min(
						settings.slidesToScroll,
						children?.length ?? 0,
					),
				},
			};
		},
		[children?.length],
	);

	const config = useMemo(
		() => ({
			...defaultConfig,
			slidesToShow: Math.min(slidesToShow, children?.length),
			slidesToScroll: Math.min(slidesToScroll, children?.length ?? 0),
			prevArrow,
			nextArrow,
			responsive: responsive.map(r => mapResponsive(r)),
		}),
		[
			slidesToShow,
			children?.length,
			slidesToScroll,
			responsive,
			prevArrow,
			nextArrow,
			mapResponsive,
		],
	);

	if (!children?.length) return <></>;

	return (
		<Slider {...config} className={className}>
			{children}
		</Slider>
	);
};

CSlider.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	slidesToShow: PropTypes.number,
	slidesToScroll: PropTypes.number,
	prevArrow: PropTypes.func,
	nextArrow: PropTypes.func,
	responsive: PropTypes.array,
};

CSlider.defaultProps = {
	slidesToShow: 3,
	slidesToScroll: 3,
	prevArrow: <PrevButton />,
	nextArrow: <NextButton />,
	responsive: [],
};
