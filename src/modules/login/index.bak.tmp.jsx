import React from 'react';

import logo from 'src/assets/images_2/logo.png';
import union from 'src/assets/images_2/union.png';

import './app.scss';

export const Login = () => {
	return (
		<div className="login">
			<div className="form">
				<div>
					<img className="logo" src={logo} alt="logo" />
					<div></div>
				</div>
			</div>
			<div className="image">
				<div className="image__wrapper">
					<img src={union} alt="union" />
				</div>
			</div>
		</div>
	);
};
