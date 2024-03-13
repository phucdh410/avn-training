import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'antd';
import './PostDetail.scss';
import { PostInfo, PostType, PostTest } from './components';
import { createStructuredSelector } from 'reselect';
import { selectTopicsData } from 'src/redux/topic/topic.selector';
import { selectCategoriesData } from 'src/redux/category/category.selector';
import { onGetAllTopic } from 'src/redux/topic/topic.action';
import { onGetListCategoriesByTopic } from 'src/redux/category/category.action';
import { onCreatePost, onUpdatePost } from 'src/redux/post/post.action';
import {
	POST_TYPE,
	TEST_TYPE,
	YOUTUBE_PLAY_URL,
} from 'src/configs/constant.config';
import { alertSuccess, alertFail } from 'src/utils/alert.util';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import api from 'src/api';
import { ROUTE_ADMIN } from 'src/configs/route.config';
import {
	dataURItoBlob,
	mapContent,
	getYoutubeID,
} from 'src/utils/function.util';
import { MESSAGE_ERROR } from 'src/configs/error.config';
import LocalesEnum from 'src/enums/locales.enum';

export const PostDetailComponent = ({
	topics,
	categories,
	onGetAllTopic,
	onCreatePost,
	onGetListCategoriesByTopic,
	onUpdatePost,
}) => {
	const [form] = Form.useForm();
	const [postType, setPostType] = useState(POST_TYPE.TEXT);
	const [topicSelected, setTopicSelected] = useState();
	const [categorySelected, setCategorySelected] = useState();
	const [testDetail, setTestDetail] = useState();
	const [clearFile, setClearFile] = useState(false);
	const [fileList, setFileList] = useState();
	const [locale, setLocale] = useState(LocalesEnum.Vi);
	const location = useLocation();
	const params = useParams();
	const history = useHistory();

	useEffect(() => {
		if (
			location.pathname.startsWith(
				`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.EDIT}`,
			)
		) {
			const getPostDetail = async () => {
				const result = await api.post.getByID(params?.id);

				const { categoryId, type, content } = result.data;

				const topicId = categoryId?.topicId?._id;

				if (topicId) {
					setTopicSelected(topicId);
				}

				setPostType(result?.data?.type);

				if (type === POST_TYPE.TEXT && content) {
					const newContent = mapContent(content);

					result.data.content = newContent;
				}

				const testResult = await api.exam.getByCategoryId(
					result?.data?.categoryId?._id,
				);

				const testDetail = testResult?.data;

				if (
					testDetail?.isExist &&
					testDetail?.type === TEST_TYPE.CATEGORY
				) {
					form.setFieldsValue({
						testType: testDetail?.type,
						linkTest: testDetail?.data?.url,
					});

					setTestDetail(testDetail);
				} else {
					const testResult = await api.exam.getByPostId(
						result?.data?._id,
					);
					const testDetail = testResult?.data;

					form.setFieldsValue({
						testType: testDetail?.sourceType,
						linkTest: testDetail?.url,
					});

					setTestDetail({
						isExist: true,
						type: testDetail?.sourceType,
						data: testDetail,
					});
				}

				//const testDetail = await api.exam.getByPostId(params?.id);

				form.setFieldsValue({
					...result.data,
					topicId,
					categoryId: result?.data?.categoryId?._id,
					// testType: testDetail?.data?.sourceType,
					// linkTest: testDetail?.data?.url,
					file: result?.data?.banner,
					banner: result?.data?.banner,
					youtubeId:
						result?.data?.type === POST_TYPE.VIDEO
							? YOUTUBE_PLAY_URL + result?.data?.youtubeId
							: '',
				});

				setLocale(result.data.lang);

				// setTestDetail({
				// 	isExist: true,
				// 	type: testDetail?.data?.sourceType,
				// });

				setFileList(result?.data?.banner);
			};

			getPostDetail();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form, location, params?.id]);

	useEffect(() => {
		onGetAllTopic();
	}, [onGetAllTopic]);

	useEffect(() => {
		if (topicSelected) {
			onGetListCategoriesByTopic(topicSelected);
		}
	}, [onGetListCategoriesByTopic, topicSelected]);

	useEffect(() => {
		if (categorySelected) {
			const checkTestExist = async () => {
				const result = await api.exam.getByCategoryId(categorySelected);

				const testDetail = result?.data;

				if (testDetail?.isExist) {
					form.setFieldsValue({
						testType: testDetail?.type,
						linkTest: testDetail?.data?.url,
					});
				}

				setTestDetail(testDetail);
			};

			checkTestExist();
		}
	}, [categorySelected, form]);

	const onChangePostType = value => setPostType(value);

	const onChangeTopic = value => {
		setTopicSelected(value);

		form.setFieldsValue({
			categoryId: null,
			linkTest: null,
			testType: null,
		});

		setTestDetail(null);
	};

	const uploadImages = async imageSrcs => {
		const srcRegex = /<img.*?src="(.*?)"/;

		const imageUploaded = [];

		for (const image of imageSrcs) {
			const srcBase64 = srcRegex.exec(image)[1];

			if (srcBase64.startsWith('data:image')) {
				const file = dataURItoBlob(srcBase64);

				const response = await api.file.uploadSingleFile(file, 2);

				imageUploaded.push({
					base64: srcBase64,
					uploaded: response,
				});
			}
		}

		return imageUploaded;
	};

	const reFormatContent = async content => {
		const images = content.match(/<img[^>]+src="([^">]+)"/g);

		if (images) {
			const imageUploadeds = await uploadImages(images);

			imageUploadeds.forEach(image => {
				content = content.replace(
					image.base64,
					image.uploaded?.data?.path,
				);
			});
		}

		return content;
	};

	const catchError = errMessage => {
		if (errMessage === MESSAGE_ERROR.DUPLICATED) {
			form.setFields([
				{
					name: 'title',
					errors: [MESSAGE_FEEDBACK.COMMON.DUPLICATE],
				},
			]);
		}
	};

	const onSubmit = async () => {
		await form.validateFields();

		const values = form.getFieldValue();

		if (postType === POST_TYPE.TEXT) {
			values.duration = 0;
		}

		if (values?.file) {
			values.banner = values?.file?.file?.response?.data?._id;
		}

		let newContent = '';

		if (values?.content && values?.type === POST_TYPE.TEXT) {
			newContent = await reFormatContent(values?.content);
		}

		let youtubeId = '';

		if (values.youtubeId && values?.type === POST_TYPE.VIDEO) {
			youtubeId = getYoutubeID(values.youtubeId);
		}

		if (
			!location.pathname.startsWith(
				`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.EDIT}`,
			)
		) {
			onCreatePost(
				{
					...values,
					content: newContent,
					youtubeId,
				},
				(status, err) => {
					if (status) {
						alertSuccess(MESSAGE_FEEDBACK.COMMON.CREATE_SUCCESS);

						setTestDetail(undefined);
						setCategorySelected(undefined);
						setTopicSelected(undefined);

						onClearFile(!clearFile);
						form.resetFields();
					} else {
						catchError(err);

						alertFail(MESSAGE_FEEDBACK.COMMON.CREATE_FAIL);
					}
				},
			);
		} else {
			onUpdatePost(
				params.id,
				{
					...values,
					content: newContent,
					youtubeId,
				},
				(status, err) => {
					if (status) {
						alertSuccess(MESSAGE_FEEDBACK.COMMON.UPDATE_SUCCESS);
						history.push(
							`${ROUTE_ADMIN.POST.BASE}${ROUTE_ADMIN.POST.LIST}`,
						);
					} else {
						catchError(err);

						alertFail(MESSAGE_FEEDBACK.COMMON.UPDATE_FAIL);
					}
				},
			);
		}
	};

	const onChangeCategorySelected = value => {
		setCategorySelected(value);

		form.setFieldsValue({
			linkTest: null,
			testType: null,
		});
	};

	const onClearFile = () => setClearFile(!clearFile);

	const onChangeLanguage = value => {
		setLocale(value);
	};

	return (
		<main className="post-detail">
			<div className="white-block-content">
				<h1 className="header-title">
					{!params?.id ? 'Tạo bài đăng mới' : 'Cập nhật bài đăng'}
				</h1>
				<Form form={form} onFinish={onSubmit} spinner>
					<div className=" w-full ">
						<PostInfo
							topics={topics?.data}
							categories={categories?.data}
							onChangeTopic={onChangeTopic}
							onChangeCategorySelected={onChangeCategorySelected}
							onChangeLanguage={onChangeLanguage}
							clearFile={clearFile}
							defaultBanner={fileList}
							mode={params?.id ? 'update' : 'create'}
							locale={locale}
						/>
						<PostType
							postType={postType}
							onChangePostType={onChangePostType}
						/>
						<PostTest
							testDetail={testDetail}
							mode={params?.id ? 'update' : 'create'}
						/>
					</div>
					<div className="btn-action-wrapper mt-5 text-right">
						<Button type="primary" htmlType="submit">
							{!params?.id ? 'Tạo bài đăng' : 'Cập nhật bài đăng'}
						</Button>
					</div>
				</Form>
			</div>
		</main>
	);
};

PostDetailComponent.propTypes = {
	topics: PropTypes.object,
	categories: PropTypes.object,
	onGetAllTopic: PropTypes.func,
	onGetListCategoriesByTopic: PropTypes.func,
	onCreatePost: PropTypes.func,
	onUpdatePost: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	topics: selectTopicsData,
	categories: selectCategoriesData,
});

export const PostDetail = connect(mapStateToProps, {
	onGetAllTopic,
	onGetListCategoriesByTopic,
	onCreatePost,
	onUpdatePost,
})(PostDetailComponent);
