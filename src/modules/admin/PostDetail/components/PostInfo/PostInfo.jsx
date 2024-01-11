import React, { useMemo } from 'react';
import './PostInfo.scss';
import { CInputAdmin, CUpload, CSelectAdmin, CNumberInput } from 'src/commons';
import { API_URL } from 'src/configs/constant.config';
import { FORM_RULES } from 'src/utils/validator.util';
import PropTypes from 'prop-types';
import {
	handleSearchBasic,
	getLinkImage,
	getFileNameFromUrl,
} from 'src/utils/function.util';
import LangEnum from 'src/enums/lang.enum';
import LocalesEnum from 'src/enums/locales.enum';

export const PostInfo = ({
	mode,
	topics,
	categories,
	onChangeTopic,
	onChangeCategorySelected,
	onChangeLanguage,
	clearFile,
	defaultBanner,
	locale,
}) => {
	const topicOptions = useMemo(() => {
		if (!Array.isArray(topics)) return [];
		return topics
			?.filter(topic => topic.lang === locale)
			?.map(topic => {
				return {
					content: topic?.name,
					value: topic?._id,
				};
			});
	}, [topics, locale]);

	return (
		<div className="post-info">
			<h1 className="form-title">Thông tin chung</h1>
			<div>
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
					onChange={onChangeLanguage}
				/>
				<CInputAdmin
					label="Tiêu đề*"
					placeholder="VD: Dinh dưỡng không thoả hiệp ..."
					name="title"
					maxLength={160}
					rules={FORM_RULES.POST.TITLE}
				/>
				<CInputAdmin
					label="Mô tả"
					type="textarea"
					placeholder="VD: Do trải nghiệm của chúng tôi với đại dịch, ...."
					name="description"
					//rules={FORM_RULES.POST.DESCRIPTION}
				/>
				<CSelectAdmin
					label="Chủ đề*"
					placeholder="Chọn chủ đề"
					name="topicId"
					rules={FORM_RULES.POST.TOPIC}
					options={topicOptions}
					showSearch
					filterOption={handleSearchBasic}
					onChange={onChangeTopic}
				/>
				<CSelectAdmin
					label="Loại chủ đề*"
					placeholder="Chọn loại chủ đề"
					name="categoryId"
					rules={FORM_RULES.POST.CATEGORY}
					options={
						Array.isArray(categories)
							? categories
									?.filter(
										category => category.lang === locale,
									)
									?.map(category => {
										return {
											content: category?.name,
											value: category?._id,
										};
									})
							: []
					}
					showSearch
					filterOption={handleSearchBasic}
					onChange={onChangeCategorySelected}
				/>
				<CNumberInput
					label="Số thứ tự"
					placeholder="Nhập số thứ tự hiển thị với các bài viết cùng chủ đề"
					name="sortOrder"
				/>
				{/* <CInputAdmin
					label="Đường dẫn SEO"
					placeholder="...."
					name="seoUrl"
				/> */}
				<CUpload
					label="Ảnh nền của bài viết*"
					note="File được chọn phải có định dạng .jpg, .png, .jpeg và dưới 25MB"
					fileExts=".jpg, .png, .jpeg"
					actionUrl={`${API_URL}/api/files/upload`}
					autoUpload
					data={{ sourceType: 1 }}
					rules={FORM_RULES.POST.BANNER}
					name="file"
					triggerClear={clearFile}
					defaultFiles={
						defaultBanner && [
							{
								uid: Date.now(),
								name: getFileNameFromUrl(defaultBanner?.path),
								status: 'done',
								url: getLinkImage(defaultBanner?.path),
							},
						]
					}
					//onUploaded={onUploadFile}
				/>
			</div>
		</div>
	);
};

PostInfo.propTypes = {
	mode: PropTypes.oneOf(['create', 'update']),
	topics: PropTypes.array,
	categories: PropTypes.array,
	onChangeTopic: PropTypes.func,
	onChangeCategorySelected: PropTypes.func,
	onChangeLanguage: PropTypes.func,
	clearFile: PropTypes.bool,
	defaultBanner: PropTypes.object,
	locale: PropTypes.string,
};
