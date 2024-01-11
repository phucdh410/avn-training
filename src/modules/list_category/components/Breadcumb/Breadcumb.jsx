import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcumb.scss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export const Breadcumb = ({ topic }) => {
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
							{topic?.name}
						</div>
					</div>
				</div>
				<div className="breadcumb__left__title">
					<span>{topic?.name}</span>
				</div>
			</div>
			<div className="breadcumb__frame">
				<img src="/images/frame_color.png" alt="" />
			</div>

			<div className="breadcumb__right--copy"></div>
		</div>
	);
};

Breadcumb.propTypes = {
	topic: PropTypes.any,
};
