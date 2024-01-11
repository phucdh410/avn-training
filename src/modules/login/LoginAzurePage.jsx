import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import api from 'src/api';
import { queryStringToObject } from 'src/utils/function.util';
import { ACCOUNT_TYPE } from 'src/configs/constant.config';

import './loader.scss';

export const LoginAzurePage = () => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const onLogin = async code => {
			try {
				const res = await api.auth.loginAzure({ code });

				if (res?.data) {
					const { accessToken } = res.data;
					window.localStorage.setItem('token', accessToken);

					const _res = await api.auth.getProfile();
					const profile = _res?.data;

					if (profile?.group === ACCOUNT_TYPE.ADMIN) {
						history.push('/admin');
						return;
					} else {
						history.push('/');
					}
				}
			} catch (error) {
				console.log(error);
			}
		};

		if (location.search) {
			const { code } = queryStringToObject(location.search);
			if (code) {
				onLogin(code);
			}
		}
	}, [history, location.search]);

	return (
		<div
			className="flex items-center justify-center h-screen w-screen text-3xl font-bold"
			style={{ color: '#333333' }}
		>
			<span className="loader"></span>
		</div>
	);
};
