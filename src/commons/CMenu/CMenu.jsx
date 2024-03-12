/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './CMenu.scss';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Link, useHistory } from 'react-router-dom';

import manify from 'src/assets/icons/magnify.svg';

import MenuFrameTran from 'src/assets/images_2/menu_frame_tran.png';
import MenuFrameColor from 'src/assets/images_2/menu_frame_color.png';

import {
	//selectTopicsData,
	selectNormalTopicsData,
} from 'src/redux/topic/topic.selector';
import { selectCategoriesData } from 'src/redux/category/category.selector';
import {
	//onGetAllTopic,
	onGetAllNormalTopic,
} from 'src/redux/topic/topic.action';
import { onGetAllCategory } from 'src/redux/category/category.action';

import { useQuery } from 'src/hooks/query.hook';
import { stringify } from 'query-string';
import { useTranslation } from 'react-i18next';

export const CMenu = ({ isShow, onClose }) => {
	const query = useQuery();

	const { t } = useTranslation();

	//const topics = useSelector(selectTopicsData);
	const normalTopics = useSelector(selectNormalTopicsData);
	const categories = useSelector(selectCategoriesData);

	const dispatch = useDispatch();
	const history = useHistory();

	const logout = () => {
		localStorage.clear();
		window.location.href = '/login';
	};

	const onSubmitSearchKeyWord = e => {
		if (e.code === 'Enter') {
			const queryPage = { ...query, title: e.target.value };
			const newQueryStr = '?' + stringify(queryPage);
			history.push(`/topic${newQueryStr}`);
			onClose();
		} else if (e.type === 'click') {
			const queryPage = { ...query, title: e.target.value };
			const newQueryStr = '?' + stringify(queryPage);
			history.push(`/topic${newQueryStr}`);
			onClose();
		}
	};

	useEffect(() => {
		onGetAllCategory({
			active: true,
			sortBy: 'sortOrder',
			sortType: 'desc',
		})(dispatch);
		// onGetAllTopic({
		// 	isPin: true,
		// })(dispatch);

		onGetAllNormalTopic({
			//isPin: false,
			active: true,
			sortBy: 'sortOrder',
			sortType: 'desc',
		})(dispatch);
	}, [dispatch]);

	return (
		<div className={classNames('menu_wrapper', isShow && 'active')}>
			<div className="header">
				<div className="header__container">
					<div className="header__wrapper">
						<div className="logo__wrapper">
							<a href="/" className="logo">
								<img
									src="/assets/images/logo.png"
									className="header__navbar__logo"
									alt=""
								/>
							</a>
						</div>
					</div>
					<div className="header__wrapper">
						<div>
							<div className="search">
								<input
									type="text"
									className="search__input"
									placeholder={t('searching') + '...'}
									onKeyDown={onSubmitSearchKeyWord}
								/>
								<img
									className="search-icon"
									src={manify}
									alt=""
									onClick={onSubmitSearchKeyWord}
								/>
							</div>
						</div>
						<div>
							<button
								onClick={onClose}
								className="button button-info"
							></button>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="menu">
					<div className="front-icon">
						<img src={MenuFrameTran} alt="" />
					</div>
					<div className="menu__container">
						<div className="menu-item">
							<h1>
								<Link to="/" onClick={onClose}>
									{t('home_page')}
								</Link>
							</h1>
						</div>
						<div className="menu-item">
							<h1 className="link">
								<Link to="/pin-topic" onClick={onClose}>
									{t('ongoing_topic')}
								</Link>
							</h1>
							<div className="menu-item-sub">
								<div className="topic">
									{categories?.data
										?.filter(item => item.sortOrder > 0)
										?.sort((a, b) => {
											if (a.sortOrder !== b.sortOrder) {
												return (
													b.sortOrder - a.sortOrder
												);
											}
											return (
												new Date(b.createdAt) -
												new Date(a.createdAt)
											);
										})
										.map(t => (
											<div key={t._id} className="link">
												<Link
													to={`/category/${t.slug}`}
													onClick={onClose}
												>
													{t.name}
												</Link>
												<i className="icon arrow-right"></i>
											</div>
										))}
								</div>
							</div>
						</div>
						<div className="menu-item">
							<h1 className="link">
								<Link to="/topic" onClick={onClose}>
									{t('training_theme_library')}
								</Link>
								{/* <i className="icon arrow-right"></i> */}
							</h1>

							<div className="menu-item-sub">
								<div className="topic">
									{normalTopics?.data
										?.sort((a, b) => {
											if (a.sortOrder !== b.sortOrder) {
												return (
													b.sortOrder - a.sortOrder
												);
											}
											return (
												new Date(b.createdAt) -
												new Date(a.createdAt)
											);
										})
										.map(t => (
											<div key={t._id} className="link">
												<Link
													to={`/topic/${t.slug}`}
													onClick={onClose}
												>
													{t.name}
												</Link>
												<i className="icon arrow-right"></i>
											</div>
										))}
								</div>
							</div>
						</div>
						{/* <div className="menu-item">
							<h1>
								<Link to="/" onClick={onClose}>
									Chính sách
								</Link>
							</h1>
						</div>
						<div className="menu-item">
							<h1>
								<Link to="/" onClick={onClose}>
									Sơ đồ website
								</Link>
							</h1>
						</div> */}
					</div>
				</div>
				<div className="image">
					<img src={MenuFrameColor} alt="" />
				</div>
			</div>
			<div className="footer">
				<div className="copyright">
					Copyright © 2022 © 2019 - 2020 Ajinomoto Co., Inc.
				</div>
				<hr />
				<div>
					<button className="button" onClick={logout}>
						{t('sign_out')} <i className="icon arrow-right" />
					</button>
				</div>
			</div>
		</div>
	);
};

CMenu.propTypes = {
	isShow: PropTypes.bool,
	onClose: PropTypes.func,
};
