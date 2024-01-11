import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';
import {
	CInputAdmin,
	CSelectAdmin,
	CUploadImage,
	CNumberInput,
} from 'src/commons';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { alertSuccess } from 'src/utils/alert.util';
import { MESSAGE_ERROR } from 'src/configs/error.config';
import './TopicModal.scss';
import { API_URL } from 'src/configs/constant.config';
import { FORM_RULES } from 'src/utils/validator.util';
import {
	getLinkImage,
	objectFlat,
	getFileNameFromUrl,
} from 'src/utils/function.util';
import LangEnum from 'src/enums/lang.enum';
import LocalesEnum from 'src/enums/locales.enum';

export const TopicModal = ({
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
	const [clearFile, setClearFile] = useState(false);

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

	const catchError = errMessage => {
		if (errMessage === MESSAGE_ERROR.DUPLICATED) {
			form.setFields([
				{
					name: 'name',
					errors: [MESSAGE_FEEDBACK.COMMON.DUPLICATE],
				},
			]);
		}
	};

	const onSumitCreate = async () => {
		await form.validateFields().catch(() => setLoading(false));

		const values = form.getFieldValue();

		const fileList = values?.banner?.fileList;

		if (!fileList.length) {
			setLoading(false);

			return form.setFields([
				{
					name: 'banner',
					errors: [MESSAGE_FEEDBACK.TOPIC.BANNER_REQUIRED],
				},
			]);
		}

		const formatedData = {
			...values,
			banner: fileList[0].response?.data?._id,
			file: fileList[0].response?.data,
		};

		onCreate(formatedData, (result, err) => {
			setLoading(false);

			if (result) {
				onHidden();
				setClearFile(!clearFile);

				form.resetFields();
				onRefetch();
				alertSuccess(MESSAGE_FEEDBACK.COMMON.CREATE_SUCCESS);

				//setClearFile(false);
			} else {
				catchError(err);
			}
		});
	};

	const onSubmitUpdate = async () => {
		await form.validateFields().catch(() => {
			setLoading(false);
		});

		const values = form.getFieldValue();

		let banner = '';

		if (!values?.banner) {
			banner = defaultValue?.banner?._id;
		} else {
			banner = values?.banner?.file?.response?.data?._id;
		}

		const formatedData = {
			...values,
			banner,
		};

		onUpdate(defaultValue._id, formatedData, (result, err) => {
			setLoading(false);
			if (result) {
				onHidden();

				setClearFile(!clearFile);

				form.resetFields();
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

	return (
		<Modal
			open={visible}
			onCancel={onHidden}
			centered
			title={
				mode === 'create' ? 'Thêm chủ đề mới' : 'Sửa thông tin chủ đề'
			}
			cancelText="Hủy bỏ"
			okText={mode === 'create' ? 'Tạo' : 'Cập nhật'}
			okButtonProps={{ onClick: onClickBtnSubmit }}
			className="admin-modal user-modal"
		>
			<Form form={form}>
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
					disabled={defaultValue && defaultValue.countChildCate > 0}
					defaultValue={LocalesEnum.Vi}
				/>
				<CInputAdmin
					label="Tên chủ đề*"
					placeholder="Nhập tên chủ đề ..."
					name="name"
					rules={FORM_RULES.TOPIC.NAME}
					maxLength={160}
				/>
				<CInputAdmin
					label="Mô tả"
					placeholder="Nhập mô tả chủ đề ..."
					name="description"
					//rules={FORM_RULES.TOPIC.DESCRIPTION}
				/>
				<CNumberInput
					label="Số thứ tự"
					placeholder="Nhập số thứ tự hiển thị với các bài viết cùng chủ đề"
					name="sortOrder"
				/>
				<CUploadImage
					label="Ảnh nền của chủ đề"
					name="banner"
					data={{ sourceType: 0 }}
					rules={FORM_RULES.TOPIC.BANNER}
					uploadUrl={`${API_URL}/api/files/upload`}
					triggerClear={clearFile}
					defaultFiles={
						defaultValue?.banner && [
							{
								uid: Date.now(),
								name: getFileNameFromUrl(
									defaultValue?.banner?.path,
								),
								status: 'done',
								url: getLinkImage(defaultValue?.banner?.path),
							},
						]
					}
				/>
				<CSelectAdmin
					label="Tình trạng ghim*"
					placeholder="Chọn tình trạng ghim"
					name="isPin"
					defaultValue={false}
					options={[
						{
							content: 'Ghim',
							value: true,
						},
						{
							content: 'Không ghim',
							value: false,
						},
					]}
				/>
				<CSelectAdmin
					label="Tình trạng chủ đề*"
					placeholder="Chọn tình trạng chủ đề"
					name="active"
					defaultValue={true}
					options={[
						{
							content: 'Hoạt động',
							value: true,
						},
						{
							content: 'Ẩn',
							value: false,
						},
					]}
				/>
				{/* <CInputAdmin
					label="Link SEO"
					placeholder="Nhập link SEO ..."
					name="seoUrl"
				/> */}
			</Form>
		</Modal>
	);
};

TopicModal.defaultProps = {
	mode: 'create',
};

TopicModal.propTypes = {
	visible: PropTypes.bool,
	onHidden: PropTypes.func,
	mode: PropTypes.oneOf(['create', 'update']),
	onCreate: PropTypes.func,
	onUpdate: PropTypes.func,
	defaultValue: PropTypes.any,
	setLoading: PropTypes.func,
	onRefetch: PropTypes.func,
};
