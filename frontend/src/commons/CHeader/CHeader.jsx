import React, {
	useEffect,
	useRef,
	useContext,
	useMemo,
	useCallback,
} from 'react';

import PropTypes from 'prop-types';

import { UserContext } from 'src/contexts/user.context';

import './CHeader.scss';

import UserDropdown from './UserDropdown';
import { useTranslation } from 'react-i18next';

export const CHeader = ({ onMenuShow }) => {
	const { t } = useTranslation();
	//#region Data
	const headerRef = useRef(null);

	const [user] = useContext(UserContext);

	const isLogined = useMemo(() => user === '', [user]);

	const showMenu = useCallback(
		e => e.stopPropagation() || (onMenuShow && onMenuShow()),
		[onMenuShow],
	);
	//#endregion

	//#region Effect
	useEffect(() => {
		const shrinkHeader = () => {
			if (
				document.body.scrollTop > 100 ||
				document.documentElement.scrollTop > 100
			) {
				headerRef.current.classList.add('shrink');
			} else {
				headerRef.current.classList.remove('shrink');
			}
		};
		window.addEventListener('scroll', shrinkHeader);
		return () => {
			window.removeEventListener('scroll', shrinkHeader);
		};
	}, []);
	//#endregion

	//#region Render
	return (
		<div className="header" ref={headerRef}>
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
					<UserDropdown isLogined={isLogined} user={user} />
					<button
						className="button button-primary"
						onClick={showMenu}
					>
						<i className="icon menu"></i>
						<span>{t('menu')}</span>
					</button>
				</div>
			</div>
		</div>
	);
	//#endregion
};

CHeader.propTypes = {
	onMenuShow: PropTypes.func,
};
