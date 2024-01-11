import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { UserContext } from 'src/contexts/user.context';
import { CPreload } from 'src/commons';
import { Redirect, useHistory } from 'react-router-dom';
import { ROUTE_ADMIN, ROUTE_IT } from 'src/configs/route.config';
import PropTypes from 'prop-types';
import api from 'src/api';
import { ACCOUNT_TYPE } from 'src/configs/constant.config';
import { changeLanguage } from 'i18next';
import LocalesEnum from 'src/enums/locales.enum';

const UserAuthComponent = ({ children }) => {
	const [userContext, setUserContext] = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		const getProfile = async () => {
			try {
				const res = await api.auth.getProfile();
				const profile = res?.data;

				if (
					profile?.group === ACCOUNT_TYPE.ADMIN &&
					window.location.pathname?.includes('login-azure')
				) {
					history.push(ROUTE_ADMIN.DASHBOARD);
				}

				if (profile?.group === 'it') {
					history.push(ROUTE_IT.BASE + ROUTE_IT.AZURE_CONFIG);
				}

				if (profile) {
					setUserContext(profile);

					await changeLanguage(profile.lang || LocalesEnum.Vi);

					setIsLoading(false);
				}
			} catch (err) {
				history.push(ROUTE_ADMIN.AUTH.LOGIN);
			}
		};
		getProfile();
	}, [history, setUserContext]);

	if (isLoading) {
		return <CPreload />;
	} else {
		if (userContext) {
			return children;
		} else {
			return <Redirect to={ROUTE_ADMIN.AUTH.LOGIN} />;
		}
	}
};

UserAuthComponent.propTypes = {
	children: PropTypes.any,
};

export const UserAuth = withRouter(UserAuthComponent);
