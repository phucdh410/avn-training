import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import './CategoryModal.scss';
import { API_URL } from 'src/configs/constant.config';
import { FORM_RULES } from 'src/utils/validator.util';
import {
	handleSearchBasic,
	//objectFlat,
	getLinkImage,
	getFileNameFromUrl,
} from 'src/utils/function.util';
import LangEnum from 'src/enums/lang.enum';
import LocalesEnum from 'src/enums/locales.enum';

export const CategoryModal = ({
	mode,
	visible,
	onHidden,
	onCreate,
	onUpdate,
	defaultValue,
	setLoading,
	topicSelected,
	topics,
	onChangeTopicSelected,
	onRefetch,
}) => {
	const [form] = Form.useForm();
	const [clearFile, setClearFile] = useState(false);
	const [clearBigBannerFile, setClearBigBannerFile] = useState(false);
	const [locale, setLocale] = useState(LocalesEnum.Vi);

	useEffect(() => {
		if (defaultValue) {
			//const valueFlated = objectFlat(defaultValue);

			form.setFieldsValue({
				...defaultValue,
			});

			if (defaultValue?.banner) {
				form.setFieldValue('banner', defaultValue.banner?._id);
			}
			if (defaultValue?.bigBanner) {
				form.setFieldValue('bigBanner', defaultValue.bigBanner?._id);
			}

			setLocale(defaultValue?.lang);
		} else {
			setLocale(LocalesEnum.Vi);
			form.resetFields();
		}
	}, [defaultValue, form]);

	const onHandleChange = useCallback(
		value => {
			if (value) {
				setLocale(value);
				form.resetFields(['topicId']);
			}
		},
		[form],
	);

	const topicOption = useMemo(() => {
		if (topics && Array.isArray(topics.data))
			return (
				topics &&
				topics?.data
					?.filter(topic => {
						return topic.lang === locale;
					})
					.map(item => {
						return {
							content: item?.name,
							value: item?._id,
						};
					})
			);
		else return [];
	}, [locale, topics]);

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

		if (!(typeof values?.banner === 'string')) {
			if (values?.banner?.file) {
				values.banner = values.banner.file?.response?.data?._id;
			} else values.banner = '';
		}
		if (!(typeof values?.bigBanner === 'string')) {
			if (values?.bigBanner?.file) {
				values.bigBanner = values.bigBanner.file?.response?.data?._id;
			} else values.bigBanner = '';
		}

		onCreate(values, (result, err) => {
			setLoading(false);

			if (result) {
				onHidden();

				setClearFile(!clearFile);
				setClearBigBannerFile(!clearBigBannerFile);

				form.resetFields();
				onRefetch();
				alertSuccess(MESSAGE_FEEDBACK.COMMON.CREATE_SUCCESS);
			} else {
				catchError(err);
			}
		});
	};

	const onSubmitUpdate = async () => {
		await form.validateFields().catch(() => setLoading(false));

		const values = form.getFieldValue();

		if (!(typeof values?.banner === 'string')) {
			if (values?.banner?.file) {
				values.banner = values.banner.file?.response?.data?._id;
			} else values.banner = '';
		}
		if (!(typeof values?.bigBanner === 'string')) {
			if (values?.bigBanner?.file) {
				values.bigBanner = values.bigBanner.file?.response?.data?._id;
			} else values.bigBanner = '';
		}

		onUpdate(defaultValue._id, values, (result, err) => {
			setLoading(false);
			if (result) {
				onHidden();

				setClearFile(!clearFile);
				setClearBigBannerFile(!clearBigBannerFile);

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
			title="Thêm loại chủ đề mới"
			cancelText="Hủy bỏ"
			okText={mode === 'create' ? 'Tạo' : 'Cập nhật'}
			okButtonProps={{ onClick: onClickBtnSubmit }}
			className="admin-modal user-modal category-modal"
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
					disabled={mode === 'update'}
					defaultValue={LocalesEnum.Vi}
					onChange={onHandleChange}
				/>
				<CInputAdmin
					label="Tên loại chủ đề*"
					placeholder="Nhập tên loại chủ đề ..."
					name="name"
					rules={FORM_RULES.TOPIC.NAME}
					maxLength={160}
				/>
				<CInputAdmin
					label="Mô tả"
					placeholder="Nhập mô tả loại chủ đề ..."
					name="description"
					// rules={FORM_RULES.TOPIC.DESCRIPTION}
				/>
				<CNumberInput
					label="Số thứ tự"
					placeholder="Nhập số thứ tự hiển thị với các bài viết cùng chủ đề"
					name="sortOrder"
				/>
				<CUploadImage
					label="Ảnh đại diện*"
					name="banner"
					data={{ sourceType: 1 }}
					rules={!defaultValue ? FORM_RULES.TOPIC.BANNER : ''}
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
				<CUploadImage
					label="Ảnh bìa"
					name="bigBanner"
					data={{ sourceType: 1 }}
					uploadUrl={`${API_URL}/api/files/upload`}
					triggerClear={clearBigBannerFile}
					defaultFiles={
						defaultValue?.bigBanner && [
							{
								uid: Date.now(),
								name: getFileNameFromUrl(
									defaultValue?.bigBanner?.path,
								),
								status: 'done',
								url: getLinkImage(
									defaultValue?.bigBanner?.path,
								),
							},
						]
					}
				/>
				<CSelectAdmin
					label="Chủ đề*"
					placeholder="Chọn loại chủ đề"
					name="topicId"
					defaultValue={topicSelected}
					options={topicOption}
					showSearch
					onChange={onChangeTopicSelected}
					filterOption={handleSearchBasic}
					rules={FORM_RULES.CATEGORY.TOPIC}
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
			</Form>
		</Modal>
	);
};

CategoryModal.defaultProps = {
	mode: 'create',
};

CategoryModal.propTypes = {
	visible: PropTypes.bool,
	onHidden: PropTypes.func,
	mode: PropTypes.oneOf(['create', 'update']),
	onCreate: PropTypes.func,
	onUpdate: PropTypes.func,
	defaultValue: PropTypes.any,
	setLoading: PropTypes.func,
	topicSelected: PropTypes.string,
	topics: PropTypes.object,
	onChangeTopicSelected: PropTypes.func,
	onRefetch: PropTypes.func,
};
