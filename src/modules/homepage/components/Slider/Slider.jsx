import './slider.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { CSlider } from 'src/commons';
import htmlParse from 'html-react-parser';

export const Slide = ({ slides }) => {
	return (
		<>
			<CSlider slidesToShow={1} slidesToScroll={1} className="banner">
				{slides.map((slide, index) => (
					<div
						key={index}
						className="slider"
						style={{ position: 'relative' }}
					>
						<img src={slide.image} alt="" />
						<div className="slider__text">
							<div className="slider__text__title">
								<h1>{htmlParse(slide.title)}</h1>
							</div>
							<div className="slider__text__content">
								<p>{slide.description}</p>
							</div>
						</div>
					</div>
				))}
			</CSlider>
		</>
	);
};

Slide.propTypes = {
	slides: PropTypes.array,
};

Slide.defaultProps = {
	slides: [
		{
			title: '',
			description: '',
			image: '',
		},
	],
};
