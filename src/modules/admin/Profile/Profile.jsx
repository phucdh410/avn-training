import React, { useContext, useEffect } from 'react';
import { Form, Button } from 'antd';
import { UserContext } from 'src/contexts/user.context';
import { LoadingContext } from 'src/contexts/loading.context';
import api from 'src/api';
import { CInputAdmin, CSelectAdmin } from 'src/commons';
import { alertFail, alertSuccess } from 'src/utils/alert.util';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import './Profile.scss';

export const UserProfile = () => {
	const [form] = Form.useForm();
	const [userInfo, setUserInfo] = useContext(UserContext);
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

		const result = await api.user.updateById(userInfo?._id, data);

		setIsLoading(false);

		if (!result?.errors?.length) {
			alertSuccess(MESSAGE_FEEDBACK.COMMON.UPDATE_SUCCESS);

			setUserInfo({
				_id: userInfo._id,
				...result,
			});
		} else {
			alertFail(MESSAGE_FEEDBACK.COMMON.UPDATE_FAIL);
		}
	};

	return (
		<main className="user-profile">
			<div className="white-block-content">
				<h1 className="header-title">Thông tin tài khoản</h1>
				<div className="user-info mt-5">
					<Form form={form} onFinish={onUpdateInfo}>
						<CInputAdmin
							label="Tên đăng nhập"
							name="username"
							disabled
						/>
						<CInputAdmin label="Tên" name="name" />
						{/* <CInputAdmin
							label="Ngày sinh"
							name="birthday"
							//rules={FORM_RULES.COMMON.EMAIL}
						/> */}
						<CSelectAdmin
							label="Giới tính"
							options={[
								{
									content: 'Nam',
									value: true,
								},
								{
									content: 'Nữ',
									value: false,
								},
							]}
							name="gender"
						/>

						<CInputAdmin
							label="Email"
							name="email"
							//rules={FORM_RULES.COMMON.EMAIL}
						/>
						<CInputAdmin
							label="Số điện thoại"
							name="phoneNumber"
							//rules={FORM_RULES.COMMON.EMAIL}
						/>
						<Form.Item className="text-right">
							<Button htmlType="submit" type="primary">
								Cập nhật thông tin
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</main>
	);
};
