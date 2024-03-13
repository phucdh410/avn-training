import React, { useEffect, useCallback, useRef } from 'react';

import logo from 'src/assets/images_2/logo.png';
// import user from 'src/assets/images/user.png';
// import password from 'src/assets/images/password.png';
import arrow from 'src/assets/images/arrow-right.png';

import framecolor from 'src/assets/images_2/frame_color.png';
import frametran from 'src/assets/images_2/frame_tran.png';

import union from 'src/assets/images_2/union.png';

import { Form, Button } from 'antd';
// import { FORM_RULES } from 'src/utils/validator.util';

import api from 'src/api';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
//import { ROUTE_CLIENT } from 'src/configs/route.config';
import { useHistory } from 'react-router-dom';

import './app.scss';
import { ACCOUNT_TYPE } from 'src/configs/constant.config';

export const Login = () => {
	const ref = useRef();
	const [form] = Form.useForm();
	const history = useHistory();

	const handleKeyUp = useCallback(event => {
		if (event.keyCode === 13) ref.current.submit();
	}, []);

	useEffect(() => {
		const token = window.localStorage.getItem('token');

		if (token) {
			const getUserProfile = async () => {
				const result = await api.auth.getProfile();

				if (result?.group === ACCOUNT_TYPE.ADMIN) {
					history.push('/admin');
				} else if (result?.username) {
					history.push('/');
				}
			};

			getUserProfile();
		}
	}, [history]);

	const onSubmitLogin = async () => {
		await form.validateFields();

		const values = form.getFieldValue();

		try {
			const result = await api.auth.login(values);

			if (result?.accessToken) {
				window.localStorage.setItem('token', result?.accessToken);

				const getUserProfile = async () => {
					const result = await api.auth.getProfile();

					if (result?.group === ACCOUNT_TYPE.ADMIN) {
						history.push('/admin');
					} else if (result?.username) {
						history.push('/');
					}
				};

				getUserProfile();
			}
		} catch (err) {
			form.setFields([
				{
					name: 'username',
					errors: [MESSAGE_FEEDBACK.AUTH.USERNAME_PASSWORD_INVALID],
				},
				{
					name: 'password',
					errors: [MESSAGE_FEEDBACK.AUTH.USERNAME_PASSWORD_INVALID],
				},
			]);
		}
	};

	const onRedirectAzure = async () => {
		try {
			const res = await api.auth.redirect({
				redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
			});
			console.log(res);
			if (res?.errorCode === 0) {
				window.location.replace(res?.data?.url);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="app">
			<div className="app__wrapper">
				<div className="app__left">
					<div className="app__left__logo">
						<img src={logo} alt="logo" />
					</div>
					<div className="app__left__wrap">
						<div className="app__left__header">
							<h2 className="app__left__header__login">
								Đăng nhập
							</h2>
							<p className="app__left__header__desc">
								Cùng Ajinomoto Việt Nam khám phá những kiến thức
								thú vị và hữu ích từ các chương trình đào tạo &
								huấn luyện nội bộ
							</p>
						</div>
						<Form
							onFinish={onSubmitLogin}
							form={form}
							ref={ref}
							onKeyUp={handleKeyUp}
						>
							{/* <div className="app__left__body"> */}
							{/* <div className="app__left__body__user">
									<div className="app__left__body__user--name">
										<span className="app__left__body__user--name__heading">
											Mã số nhân viên <span>*</span>
										</span>
									</div>

									<Form.Item
										rules={FORM_RULES.AUTH.USERNAME}
										name="username"
									>
										<div className="app__left__body__user__input">
											<img
												src={user}
												className="app__left__body__user__input__mail"
												alt="Email"
											/>

											<Input
												className="app__left__body__user__input__name"
												placeholder="Mã nhân viên"
											/>
										</div>
									</Form.Item>
								</div>

								<div className="app__left__body__password">
									<div className="app__left__body__password--name">
										<span className="app__left__body__password--name__heading">
											Mật khẩu <span>*</span>
										</span>
									</div>
									<Form.Item
										rules={FORM_RULES.AUTH.PASSWORD}
										name="password"
									>
										<div className="app__left__body__password__input">
											<img
												src={password}
												className="app__left__body__password__input__pass"
												alt="Password"
											/>
											<Input
												className="app__left__body__password__input__name"
												placeholder="***************"
												type="password"
											/>
										</div>
									</Form.Item>
								</div> */}

							{/* <div className="app__left__body__default">
									Mật khẩu mặc định AVN12345
								</div> */}
							{/* </div> */}
							<div className="h-1 mb-10"></div>
							<Button
								className="app__left__body__btn"
								htmlType="button"
								onClick={onRedirectAzure}
							>
								Đăng nhập
								<img
									src={arrow}
									alt=""
									className="app__left__body__btn__icon"
								/>
							</Button>
						</Form>
					</div>
					<div className="app__left__footer">
						<div className="app__left__footer__copy">
							Copyright © 2022 Ajinomoto Co., Inc.
						</div>
					</div>
				</div>
				<div className="app__right">
					<div className="app__right__img">
						<div className="app__frame__color">
							<img
								src={framecolor}
								className="app__frame__color__img"
								alt=""
							/>
						</div>
						<div className="image__wrapper wave-left">
							<img src={union} alt="" />
						</div>
						<div className="app__frame__tran">
							<img
								src={frametran}
								className="app__frame__tran__img"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
