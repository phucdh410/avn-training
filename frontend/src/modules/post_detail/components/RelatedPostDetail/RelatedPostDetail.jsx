import React from 'react';
import { CTopicCard, CButtonTopic } from 'src/commons';
import PropTypes from 'prop-types';

import playbtn from '../../assets/img/playbtn.png';
import true_icon from '../../assets/img/true_icon.png';

export const RelatedPostDetail = ({
	className,
	name,
	createdAt,
	image,
	title,
	description,
	href,
}) => {
	return (
		<CTopicCard
			className={`related-slider__item ${className}`}
			image={image}
			title={title}
			description={description}
			href={href}
		>
			<div className="related-slider__item__img">
				<img
					src={playbtn}
					alt=""
					className={`related-slider__item__img__btn `}
				/>
			</div>
			<span className="related-slider__item__title">{name}</span>
			<p className="related-slider__item__date">{createdAt}</p>
			<CButtonTopic className={`related-slider__button`}>
				<img
					src={true_icon}
					className="related-slider__button__icon"
					alt=""
				/>
				<p className="related-slider__button__txt">Đã xem</p>
			</CButtonTopic>
		</CTopicCard>
	);
};

RelatedPostDetail.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	createdAt: PropTypes.string,
	image: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	href: PropTypes.string,
};
