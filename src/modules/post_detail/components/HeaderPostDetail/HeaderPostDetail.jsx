import React, { useMemo } from 'react';
import './HeaderPostDetail.scss';

import { Link } from 'react-router-dom';

import arr_left from '../../assets/img/arr_left.png';
import Frame_color from '../../assets/img/Frame_color.png';
import { POST_TYPE } from 'src/configs/constant.config';

import green from '../../assets/img/green.png';
import blue from '../../assets/img/blue.png';
import orange from '../../assets/img/orange.png';
import halfgreen from '../../assets/img/halfgreen.png';
import halfblue from '../../assets/img/halfblue.png';

import PropTypes from 'prop-types';

import { t } from 'i18next';

const noteText = {
	required: {
		icon: '/assets/icons/rule_checklist.svg',
		content: 'please_read_carefully_1',
	},
	back: {
		icon: '/assets/icons/rule_arrow-left.svg',
		content: 'please_read_carefully_2',
	},
	requiredAll: {
		icon: '/assets/icons/rule_checklist.svg',
		content: 'please_read_carefully_3',
	},
};

const noteVideo = {
	required: {
		icon: '/assets/icons/rule_checklist.svg',
		content: 'please_read_carefully_4',
	},
	back: {
		icon: '/assets/icons/rule_arrow-left.svg',
		content: 'please_read_carefully_5',
	},
	requiredAll: {
		icon: '/assets/icons/rule_checklist.svg',
		content: 'please_read_carefully_6',
	},
	firstTime: {
		icon: '/assets/icons/rule_time.svg',
		content: 'please_read_carefully_7',
	},
	only: {
		icon: '/assets/icons/rule_camera.svg',
		content: 'please_read_carefully_8',
	},
};

export const HeaderPostDetail = ({ postDetail, testDetail }) => {
	const renderTest = useMemo(() => {
		const list = [];

		if (postDetail) {
			if (postDetail.type == POST_TYPE.TEXT) {
				if (testDetail) {
					list.push({
						key: `require_${Date.now()}`,
						...noteText.required,
					});
				} else {
					list.push({ key: `back_${Date.now()}`, ...noteText.back });
					list.push({
						key: `required_${Date.now()}`,
						...noteText.required,
					});
				}
			} else {
				if (testDetail) {
					list.push({
						key: `required_${Date.now()}`,
						...noteVideo.required,
					});
					list.push({
						key: `only_${Date.now()}`,
						...noteVideo.firstTime,
					});
				} else {
					list.push({
						key: `required_${Date.now()}`,
						...noteVideo.back,
					});
					list.push({
						key: `firstTime${Date.now()}`,
						...noteVideo.firstTime,
					});
					list.push({
						key: `only_${Date.now()}`,
						...noteVideo.requiredAll,
					});
				}
			}
		}

		return list;
	}, [postDetail, testDetail]);

	return (
		<div className="header-post">
			<Link to={`/category/${postDetail?.categoryId?.slug}`}>
				<img src={arr_left} className="header-post__prev" alt="" />
			</Link>
			<div className="header-post__wrap">
				<div className="header-post__breadcumb">
					<Link to="/" className="header-post__breadcumb--back">
						{t('home_page')} / &nbsp;
					</Link>
					<Link to="/topic" className="header-post__breadcumb--back">
						{t('topic')} / &nbsp;
					</Link>
					<Link
						to={`/category/${postDetail?.categoryId?.slug}`}
						className="header-post__breadcumb--back"
					>
						{postDetail?.categoryId?.name} / &nbsp;
					</Link>
					<div className="header-post__breadcumb--end">
						{postDetail?.title}
					</div>
				</div>
				<div className="header-post__rule">
					<div className="header-post__rule__text">
						<span className="header-post__rule__text__title">
							{t('tip_for_you')}:
						</span>
						<div className="header-post__rule__text__list">
							{renderTest.map(({ key, icon, content }) => (
								<div
									key={key}
									className="header-post__rule__text__item"
								>
									<img
										src={icon}
										className="header-post__rule__text__item__img"
										alt=""
									/>
									<p className="header-post__rule__text__item__desc">
										{t(content)}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="header-post__rule__image">
						<div className="header-post__rule__image__green">
							<img
								src={halfgreen}
								className="header-post__rule__image__green--half"
								alt=""
							/>
							<img
								src={green}
								className="header-post__rule__image__green--one"
								alt=""
							/>
						</div>
						<div className="header-post__rule__image__blue">
							<img
								src={halfblue}
								className="header-post__rule__image__blue--half"
								alt=""
							/>
							<img
								src={blue}
								className="header-post__rule__image__blue--one"
								alt=""
							/>
							<img
								src={orange}
								className="header-post__rule__image__blue--orange"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
			<img src={Frame_color} className="header-post__frame" alt="" />
		</div>
	);
};

HeaderPostDetail.propTypes = {
	postDetail: PropTypes.any,
	testDetail: PropTypes.any,
	postRelated: PropTypes.any,
};
