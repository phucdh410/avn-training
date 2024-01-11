import React from 'react';
import { Link } from 'react-router-dom';

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
							{t('topic')} / &nbsp;
						</Link>
						<div className="breadcumb__left__heading__item--category">
							<span>{t('all_training_topics')}</span>
						</div>
					</div>
				</div>
				<div className="breadcumb__left__title">
					<span>{t('all_training_topics')}</span>
				</div>
			</div>
			<div className="breadcumb__frame">
				<img src="/images/frame_color.png" alt="" />
			</div>

			<div className="breadcumb__right--copy"></div>
		</div>
	);
};
