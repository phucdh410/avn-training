import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';
import { CInputAdmin, CSelectAdmin } from 'src/commons';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { alertSuccess } from 'src/utils/alert.util';
import { MESSAGE_ERROR } from 'src/configs/error.config';
import axios from 'axios';
import { FORM_RULES } from 'src/utils/validator.util';
import LangEnum from 'src/enums/lang.enum';
import LocalesEnum from 'src/enums/locales.enum';

export const RoleModal = ({
	visible,
	onHidden,
	onUpdate,
	setLoading,
	onRefetch,
	defaultValue,
}) => {
	const [form] = Form.useForm();

	const catchError = err => {
		const errors = err?.errors;

		const keys = errors?.map(error => error?.key);

		if (err?.message === MESSAGE_ERROR.DUPLICATED) {
			form.setFields([
				{
					name: 'username',
					errors: [MESSAGE_FEEDBACK.COMMON.DUPLICATE],
				},
			]);
		}
		if (keys.includes('email')) {
			form.setFields([
				{
					name: 'email',
					errors: [MESSAGE_FEEDBACK.COMMON.EMAIL_NOT_VALID],
				},
			]);
		}
	};

	const onSubmitUpdate = async () => {
		await form.validateFields().catch(() => setLoading(false));

		const values = form.getFieldValue();

		onUpdate(defaultValue._id, values, (result, err) => {
			setLoading(false);
			if (result) {
				onHidden();
				onRefetch();
				alertSuccess(MESSAGE_FEEDBACK.COMMON.UPDATE_SUCCESS);
			} else {
				catchError(err);
			}
		});
	};

	const onClickBtnSubmit = () => {
		setLoading(true);

		onSubmitUpdate();
	};

	useEffect(() => {
		const getUserData = async () => {
			const token = localStorage.getItem('token');

			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/accounts/getById/${defaultValue?._id}`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);

			if (res?.status === 200 && res?.data?.data) {
				const _data = res.data.data;

				form.setFieldValue('lang', _data?.lang);
				form.setFieldValue('unit', _data?.unit);
				form.setFieldValue('gender', _data?.gender);

				if (!_data?.isAdmin) {
					form.setFieldValue('isAdmin', 0);
				} else {
					form.setFieldValue('isAdmin', _data.isAdmin);
				}
			}
		};

		if (defaultValue) {
			getUserData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue]);

	return (
		<Modal
			open={visible}
			onCancel={onHidden}
			centered
			title="Chỉnh sửa loại tài khoản"
			cancelText="Hủy bỏ"
			okText="Cập nhật"
			okButtonProps={{ onClick: onClickBtnSubmit }}
			className="admin-modal user-modal"
		>
			<Form form={form}>
				<CSelectAdmin
					label="Loại tài khoản*"
					placeholder="Chọn loại tài khoản"
					name="isAdmin"
					options={[
						{
							content: 'Tài khoản quản trị',
							value: 1,
						},
						{
							content: 'Tài khoản nhân viên',
							value: 0,
						},
						{
							content: 'Tài khoản IT',
							value: 2,
						},
					]}
					defaultValue={defaultValue?.isAdmin}
				/>

				<CSelectAdmin
					label="Giới tính*"
					placeholder="Chọn giới tính"
					name="gender"
					rules={FORM_RULES.USER.GENDER}
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
				/>
				<CInputAdmin
					label="Đơn vị*"
					placeholder="Nhập tên đơn vị làm việc ..."
					name="unit"
					rules={FORM_RULES.USER.UNIT}
				/>

				<CSelectAdmin
					label="Ngôn ngữ*"
					placeholder="Chọn ngôn ngữ"
					name="lang"
					options={[
						{
							content: LangEnum.vi,
							value: LocalesEnum.Vi,
						},
						{
							content: LangEnum.en,
							value: LocalesEnum.En,
						},
					]}
					defaultValue={LocalesEnum.Vi}
				/>
			</Form>
		</Modal>
	);
};

RoleModal.defaultProps = {
	mode: 'create',
};

RoleModal.propTypes = {
	visible: PropTypes.bool,
	onHidden: PropTypes.func,
	onUpdate: PropTypes.func,
	defaultValue: PropTypes.any,
	setLoading: PropTypes.func,
	onRefetch: PropTypes.func,
};
