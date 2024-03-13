import React, { useState, useEffect } from 'react';
import './BreadcumbDetail.scss';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Frame_color from '../../assets/img/Frame_color.png';

import defaultBanner from '../../assets/img/category_banner.jpg';

import { getLinkImage } from 'src/utils/function.util';
import { useTranslation } from 'react-i18next';

export const BreadcumbDetail = ({ category }) => {
	const [bannerLink, setBannerLink] = useState(defaultBanner);

	const { t } = useTranslation();

	useEffect(() => {
		if (category?.bigBanner) {
			setBannerLink(getLinkImage(category?.bigBanner?.path));
		} else {
			setBannerLink(defaultBanner);
		}
	}, [category]);

	return (
		<div className="breadcumb-detail">
			<div className="breadcumb-detail__wrap">
				<div className="breadcumb-detail__left">
					<div className="breadcumb-detail__wrap__wrap-heading">
						<div className="breadcumb-detail__wrap__heading__item">
							<Link
								to="/"
								className="breadcumb-detail__wrap__heading__item--home"
							>
								{t('home_page')} / &nbsp;
							</Link>
							<Link
								to="/topic"
								className="breadcumb-detail__wrap__heading__item--topic"
							>
								{t('topic')} / &nbsp;
							</Link>
							<div className="breadcumb-detail__wrap__heading__item--category">
								{category?.name}
							</div>
						</div>
					</div>
					<div className="breadcumb-detail__wrap__title">
						<span>{category?.name}</span>
					</div>
					<div className="breadcumb-detail__wrap__desc">
						{category?.description}
					</div>
				</div>
				<div className="breadcumb-detail__right">
					<div className="breadcumb-detail__frame">
						<img src={Frame_color} alt="" />
					</div>
				</div>
			</div>

			<div
				className="breadcumb-detail__banner"
				style={{
					backgroundImage: `url('${bannerLink}')`,
				}}
			></div>
		</div>
	);
};

BreadcumbDetail.propTypes = {
	category: PropTypes.any,
};
