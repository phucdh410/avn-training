import React, { useMemo } from 'react';
import { CButton } from 'src/commons';
import { PinTopicItem } from './PinTopicItem';
import './PinTopic.scss';
import PropTypes from 'prop-types';
import { getLinkImage } from 'src/utils/function.util';
//import { Link } from 'react-router-dom';

import excludeIcon from '../assets/Exclude-icon.png';

export const PinTopic = ({ data, onShowMore, total, page }) => {
	const pinTopics = useMemo(() => {
		return data
			?.filter(item => item.sortOrder > 0)
			?.sort((a, b) => {
				if (a?.sortOrder !== b?.sortOrder) {
					return b?.sortOrder - a?.sortOrder;
				}
				return new Date(b?.createdAt) - new Date(a?.createdAt);
			});
	}, [data]);

	return (
		<div className="pin-topic">
			<img
				src={excludeIcon}
				className="pin-topic-page__Ex-right"
				alt=""
			/>
			<div className="pin-topic__main">
				{pinTopics?.map((topic, index) => (
					<PinTopicItem
						key={topic._id}
						title={topic?.name}
						description={topic?.description}
						index={index + 1}
						image={getLinkImage(topic?.banner?.path)}
						slug={topic?.slug}
						detail={topic?.topicId}
					/>
				))}
			</div>

			{page * 10 < total ? (
				<div className="pin-topic__footer">
					<CButton
						className="pin-topic__footer__wrap"
						onClick={onShowMore}
					>
						Xem thêm các chủ đề nổi bật
					</CButton>
				</div>
			) : (
				''
			)}
		</div>
	);
};

PinTopic.propTypes = {
	data: PropTypes.any,
	onShowMore: PropTypes.func,
	total: PropTypes.number,
	page: PropTypes.number,
};
