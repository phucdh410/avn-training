import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserDropdown = ({ isLogined, user }) => {
	const [isDropDown, setDropdown] = useState(false);
	const history = useHistory();

	const { t } = useTranslation();

	const toggleDropDown = useCallback(
		e => e.stopPropagation() || setDropdown(!isDropDown),
		[isDropDown],
	);

	const logout = useCallback(() => {
		window.localStorage.removeItem('token');

		history.push('/login');
	}, [history]);

	useEffect(() => {
		const onWindowClick = () => isDropDown && setDropdown(!isDropDown);

		window.addEventListener('click', onWindowClick);
		return () => window.removeEventListener('click', onWindowClick);
	}, [isDropDown, setDropdown]);

	if (isLogined)
		return (
			<Link to="/login" className="button">
				Login
			</Link>
		);

	return (
		<>
			<div
				className="user__wrapper"
				onClick={toggleDropDown}
				onKeyDown={() => {}}
				role="button"
				tabIndex="0"
			>
				{user.avatar ? (
					<img className="avatar" src={user.avatar} alt="" />
				) : (
					<span className="avatar">
						{user?.name?.[0] || user?.username?.[0]}
						{/* {user?.name || user?.username} */}
					</span>
				)}
				<div className="username">{user?.name || user?.username}</div>
				<div
					className={classNames(
						'icon',
						'dropdown',
						isDropDown && 'active',
					)}
				></div>
			</div>

			<div
				className={classNames('user__dialog', isDropDown && 'active')}
				onClick={e => e.stopPropagation()}
				onKeyDown={() => {}}
				role="menu"
				tabIndex="-1"
			>
				<div className="title">{t('optional')}:</div>
				<button className="button" onClick={logout}>
					{t('sign_out')} <i className="icon arrow-right" />
				</button>
			</div>
		</>
	);
};

UserDropdown.propTypes = {
	isLogined: PropTypes.bool,
	user: PropTypes.object,
};

export default UserDropdown;
