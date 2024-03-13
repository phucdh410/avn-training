import React from 'react';
import { Link } from 'react-router-dom';

import frameColor from 'src/assets/images_2/frame_color.png';

import './Breadcumb.scss';
import { useTranslation } from 'react-i18next';

export const Breadcumb = () => {
	const { t } = useTranslation();
	return (
		<div className="breadcumb">
			<div className="breadcumb__left">
				<div className="breadcumb__left__wrap-heading">
					<div className="breadcumb__left__heading__item">
						<Link
							to="/"
							className="breadcumb__left__heading__item--home"
						>
							{t('home_page')} / &nbsp;
						</Link>
						<Link
							to="/topic"
							className="breadcumb__left__heading__item--topic"
						>
							{t('ongoing_topic')}
						</Link>
					</div>
				</div>
				<div className="breadcumb__left__title">
					<span>{t('ongoing_training_topic')}</span>
				</div>
			</div>
			<div className="breadcumb__frame">
				<img src={frameColor} alt="" />
			</div>
		</div>
	);
};
