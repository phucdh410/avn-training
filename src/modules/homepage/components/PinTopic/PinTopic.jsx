import React, { useMemo } from 'react';
import { CButton } from 'src/commons';
import { PinTopicItem } from '..';
import './PinTopic.scss';
import PropTypes from 'prop-types';
import { getLinkImage } from 'src/utils/function.util';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PinTopic = ({ data }) => {
	const { t } = useTranslation();

	const transformData = useMemo(() => {
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
		<div id="pin-topic" className="pin-topic">
			<div className="pin-topic__header">
				<div className="pin-topic__header__title">
					<h1>{t('ongoing_training_topic')}</h1>
				</div>
				<div>
					<CButton className="pin-topic__header__btn">
						<Link to="/pin-topic">{t('all_ongoing_topic')}</Link>
						<img
							src="/assets/images/right.png"
							className="pin-topic__header__icon"
							alt=""
						/>
					</CButton>
				</div>
			</div>

			<div className="pin-topic__main">
				{transformData?.map((topic, index) => (
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

			{/* <div className="pin-topic__footer">
				<CButton className="pin-topic__footer__wrap">
					<Link to="/pin-topic">Xem thêm các chủ đề nổi bật</Link>
				</CButton>
			</div> */}
		</div>
	);
};

PinTopic.propTypes = {
	data: PropTypes.any,
	ref: PropTypes.any,
};
