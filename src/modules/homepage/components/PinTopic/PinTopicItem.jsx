import React from 'react';
import { CSection, CButtonTopic } from 'src/commons';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { useTranslation } from 'react-i18next';

export const PinTopicItem = ({ image, title, slug, description, detail }) => {
	const { t } = useTranslation();
	return (
		<CSection className="topic-item">
			<div className="image">
				<div className="image__wrapper">
					<LazyLoad once offset={100}>
						<img
							src={image || '/assets/images/homepage/topic2.png'}
							alt={`Hình ${title}`}
						/>
					</LazyLoad>
				</div>
			</div>
			<div className="content__wrapper">
				<div className="content">
					<div className="topic-button">
						<CButtonTopic>{detail?.name || 'Chủ đề'} </CButtonTopic>
					</div>
					<div className="title">
						<a href={`/category/${slug}`}>
							<h4>{title}</h4>
						</a>
					</div>
					<div className="description">
						<p>{description}</p>
					</div>
				</div>
				<div className="more">
					<a href={`/category/${slug}`}>{t('view_detail')}</a>
					<img src="/assets/images/right_blue.png" alt="" />
				</div>
			</div>
		</CSection>
	);
};

PinTopicItem.propTypes = {
	image: PropTypes.string,
	index: PropTypes.number,
	title: PropTypes.string,
	slug: PropTypes.string,
	description: PropTypes.string,
	detail: PropTypes.object,
};
