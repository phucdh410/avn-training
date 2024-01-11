import React from 'react';
import { CTopicCard } from 'src/commons';
import PropTypes from 'prop-types';

export const TopicCardItem = ({ image, name, description }) => {
	return (
		<CTopicCard className="list__topic__body__grid--item">
			<img src={image} alt="" />
			<h6 className="list__topic__body__grid--item__title">{name}</h6>
			{description ? (
				<p className="list__topic__body__grid--item__desc">
					{description}
				</p>
			) : (
				''
			)}
		</CTopicCard>
	);
};

TopicCardItem.propTypes = {
	image: PropTypes.string,
	name: PropTypes.string,
	description: PropTypes.string,
};

TopicCardItem.defaultProps = {
	//image: '/assets/images/homepage/bg_big.png',
	name: 'Tên chủ đề',
};
