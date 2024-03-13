import React from 'react';
import PropTypes from 'prop-types';

import { CButtonTopic } from '../../../../commons/CButton/CButton';
import { POST_TYPE } from 'src/configs/constant.config';

import playbtn from '../../assets/img/playbtn.png';
import true_icon from '../../assets/img/true_icon.png';
import { useTranslation } from 'react-i18next';

export const PostDetail = ({ name, image, createdAt, done, type, slug }) => {
	const { t } = useTranslation();
	return (
		<div>
			<a
				href={`/post/${
					type === POST_TYPE.TEXT ? 'text' : 'video'
				}/${slug}`}
			>
				<div className="list-detail__post__img">
					<img
						src={image}
						alt={name}
						style={{ width: '100%', height: '100%' }}
					/>
					{type === POST_TYPE.VIDEO ? (
						<img
							src={playbtn}
							className="list-detail__post__img__btn"
							alt=""
						/>
					) : (
						''
					)}
				</div>
			</a>
			<div
				className="list-detail__post__title__wrapper"
				style={{ marginTop: '24px' }}
			>
				<span className="list-detail__post__title">
					<a
						href={`/post/${
							type === POST_TYPE.TEXT ? 'text' : 'video'
						}/${slug}`}
					>
						{name}
					</a>
				</span>
			</div>
			<p className="list-detail__post__date">
				{t('publish_date')}:{' '}
				{createdAt && t('date_format', { date: createdAt })}
			</p>
			{done ? (
				<CButtonTopic className="list-detail__post__button">
					<img
						src={true_icon}
						className="list-detail__post__icon"
						alt=""
					/>
					<span className="list-detail__post__check-btn">
						{t('seen')}
					</span>
				</CButtonTopic>
			) : (
				''
			)}
		</div>
	);
};

PostDetail.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	createdAt: PropTypes.string,
	done: PropTypes.bool,
	type: PropTypes.number,
	slug: PropTypes.slug,
};

PostDetail.defaultProps = {
	name: 'Tiêu đề của bài viết',
	image: '/assets/images/homepage/bg_big.png',
	createdAt: '2022-03-18T01:38:04.225+00:00',
	done: false,
	type: 0,
};
