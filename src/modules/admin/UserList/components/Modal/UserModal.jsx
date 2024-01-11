import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';
import { CInputAdmin, CSelectAdmin } from 'src/commons';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { alertFail, alertSuccess } from 'src/utils/alert.util';
import { MESSAGE_ERROR } from 'src/configs/error.config';
import './UserModal.scss';
import { FORM_RULES } from 'src/utils/validator.util';
import { objectFlat } from 'src/utils/function.util';
import LangEnum from 'src/enums/lang.enum';
import LocalesEnum from 'src/enums/locales.enum';
import axios from 'axios';

export const UserModal = ({
	mode,
	visible,
	onHidden,
	onCreate,
	onUpdate,
	defaultValue,
	setLoading,
	onRefetch,
}) => {
	const [form] = Form.useForm();

	const [isAdminUser, setIsAdminUser] = useState(0);

	useEffect(() => {
		if (defaultValue) {
			const valueFlated = objectFlat(defaultValue);

			form.setFieldsValue({
				...valueFlated,
			});
		} else {
			form.resetFields();
		}
	}, [defaultValue, form]);

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

	const onSumitCreate = async () => {
		const isValidateSuccess = await form
			.validateFields()
			.catch(() => setLoading(false));

		if (!isValidateSuccess) {
			return;
		}

		const values = form.getFieldValue();

		if (values.password.length < 6) {
			form.setFields([
				{
					name: 'password',
					errors: [MESSAGE_FEEDBACK.USER.PASSWORD_LENGTH],
				},
			]);
		}

		return onCreate(values, (result, err) => {
			setLoading(false);
			if (result) {
				onHidden();

				form.resetFields();
				onRefetch();
				alertSuccess(MESSAGE_FEEDBACK.COMMON.CREATE_SUCCESS);
			} else {
				alertFail(err?.message || 'Có lỗi xảy ra!');
				catchError(err);
			}
		});
	};

	const onSubmitUpdate = async () => {
		await form.validateFields().catch(() => setLoading(false));

		const values = form.getFieldValue();

		if (values?.birthday) {
			delete values?.birthday;
		}

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

		if (mode === 'create') {
			onSumitCreate();
		}
		if (mode === 'update') {
			onSubmitUpdate();
		}
	};

	const onChangeUserType = value => setIsAdminUser(value);

	useEffect(() => {
		const getUserData = async () => {
			const token = localStorage.getItem('token');

			const res = await axios.get(
				`${process.env.REACT_APP_API_URL}/api/accounts/getById/${defaultValue?._id}`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);

			if (res?.status === 200 && res?.data?.data) {
				const _data = res.data.data;

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
			title={
				mode === 'create'
					? 'Thêm nhân viên mới'
					: 'Sửa thông tin nhân viên'
			}
			cancelText="Hủy bỏ"
			okText={mode === 'create' ? 'Tạo' : 'Cập nhật'}
			okButtonProps={{ onClick: onClickBtnSubmit }}
			className="admin-modal user-modal"
		>
			<Form form={form}>
				<CInputAdmin
					label="Mã nhân viên*"
					placeholder="Nhập mã nhân viên ..."
					name="username"
					rules={FORM_RULES.USER.MSSV}
					disabled={mode === 'update'}
				/>
				{mode === 'create' ? (
					<CInputAdmin
						label="Mật khẩu*"
						placeholder="Nhập mật khẩu ..."
						name="password"
						type="password"
						rules={FORM_RULES.USER.PASSWORD}
					/>
				) : (
					''
				)}

				<CInputAdmin
					label="Tên*"
					placeholder="Nhập tên ..."
					name="name"
					rules={FORM_RULES.USER.NAME}
				/>
				{/* <CInputAdmin
					label="Ngày sinh"
					placeholder="Nhập ngày sinh ..."
					name="birthday"
				/> */}
				<CInputAdmin
					label="Email*"
					placeholder="Nhập email ..."
					name="email"
					rules={FORM_RULES.USER.EMAIL}
				/>
				<CInputAdmin
					label="Số điện thoại"
					placeholder="Nhập số diện thoại ..."
					name="phoneNumber"
					rules={FORM_RULES.USER.PHONE}
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
					onChange={onChangeUserType}
					defaultValue={mode === 'create' ? 0 : defaultValue?.isAdmin}
				/>

				{isAdminUser === 0 ? (
					<>
						<CInputAdmin
							label="Phòng ban*"
							placeholder="Nhập tên phòng ban làm việc ..."
							name="department"
							rules={FORM_RULES.USER.DEPARTMENT}
						/>
						<CInputAdmin
							label="Bộ phận*"
							placeholder="Nhập tên bộ phận làm việc ..."
							name="section"
							rules={FORM_RULES.USER.SECTION}
						/>
						<CInputAdmin
							label="Đơn vị*"
							placeholder="Nhập tên đơn vị làm việc ..."
							name="unit"
							rules={FORM_RULES.USER.UNIT}
						/>
						<CInputAdmin
							label="Vị trí*"
							placeholder="Nhập tên vị trí làm việc ..."
							name="position"
							rules={FORM_RULES.USER.POSITION}
						/>
					</>
				) : (
					''
				)}

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

UserModal.defaultProps = {
	mode: 'create',
};

UserModal.propTypes = {
	visible: PropTypes.bool,
	onHidden: PropTypes.func,
	mode: PropTypes.oneOf(['create', 'update']),
	onCreate: PropTypes.func,
	onUpdate: PropTypes.func,
	defaultValue: PropTypes.any,
	setLoading: PropTypes.func,
	onRefetch: PropTypes.func,
};
