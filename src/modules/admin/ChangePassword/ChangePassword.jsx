import React, { useContext, useEffect } from 'react';
import { Form, Button } from 'antd';
import { UserContext } from 'src/contexts/user.context';
import { LoadingContext } from 'src/contexts/loading.context';
import { alertSuccess } from 'src/utils/alert.util';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { CInputAdmin } from 'src/commons';
import { FORM_RULES } from 'src/utils/validator.util';
import api from 'src/api';
import './ChangePassword.scss';

export const ChangePassword = () => {
	const [form] = Form.useForm();
	const [userInfo] = useContext(UserContext);
	const [, setIsLoading] = useContext(LoadingContext);

	useEffect(() => {
		if (userInfo) {
			form.setFieldsValue({
				...userInfo,
			});
		}
	}, [form, userInfo]);

	const onUpdateInfo = async () => {
		setIsLoading(true);

		const data = await form.validateFields();

		const result = await api.user
			.changePassword({
				username: userInfo?.username,
				...data,
			})
			.catch(() => {
				setIsLoading(false);

				form.setFields([
					{
						name: 'oldPassword',
						errors: [MESSAGE_FEEDBACK.USER.OLD_PASSWORD_WRONG],
					},
				]);
			});

		if (result) {
			setIsLoading(false);

			alertSuccess(MESSAGE_FEEDBACK.COMMON.UPDATE_SUCCESS);
		}
	};

	return (
		<main className="user-profile">
			<div className="white-block-content">
				<h1 className="header-title">Đổi mật khẩu</h1>
				<div className="user-info mt-5">
					<Form form={form} onFinish={onUpdateInfo}>
						<CInputAdmin
							label="Mật khẩu cũ"
							name="oldPassword"
							rules={FORM_RULES.USER.OLD_PASSWORD}
							type="password"
						/>
						<CInputAdmin
							label="Mật khẩu mới"
							name="newPassword"
							rules={FORM_RULES.USER.NEW_PASSWORD}
							type="password"
						/>
						<CInputAdmin
							label="Xác thực mật khẩu"
							name="confirmPassword"
							rules={FORM_RULES.USER.CONFIRM_PASSWORD}
							type="password"
						/>
						<Form.Item className="text-right">
							<Button htmlType="submit" type="primary">
								Đổi mật khẩu
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</main>
	);
};
