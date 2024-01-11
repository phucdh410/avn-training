import { Hero, Slides } from 'src/modules/admin/Homepage/components';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import api from 'src/api';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';
import { alertFail, alertSuccess } from 'src/utils/alert.util';
import PropTypes from 'prop-types';
import LangEnum from 'src/enums/lang.enum';

export const GeneralHome = ({ language }) => {
	const [form] = Form.useForm();
	const [homepageDetail, setHomepageDetail] = useState();
	const [slides, setSlides] = useState([]);
	const [currentTab, setCurrentTab] = useState([]);
	const [hasChangedTab, setHasChangedTab] = useState(false);

	useEffect(() => {
		const getHomepage = async () => {
			const result = await api.homepage.getHomePageByLanguage({
				lang: language,
			});
			if (result?.data) {
				const detail = result?.data;

				form.setFieldsValue({
					introduce: detail.introduce,
					bigBanner: detail.bigBanner?._id,
					smallBanner: detail.smallBanner?._id,
				});

				if (detail?.slides?.length) {
					const formatedSlide = detail?.slides?.map(slide => ({
						key: Date.now(),
						title: slide.title,
						description: slide.description,
						sortOrder: slide.sortOrder,
						file: slide.file,
					}));

					if (formatedSlide?.length) {
						setCurrentTab(formatedSlide[0]);
					}

					setSlides(detail.slides);
				}

				setHomepageDetail(detail);
			}
		};

		getHomepage().then(r => r);
	}, [form, language]);

	const onChangeSlide = value => {
		const slide = slides.find(slide => slide.key === value);
		if (slide) {
			form.setFieldsValue({
				file: slide.file ?? '',
				title: slide.title,
				description: slide.description,
				sortOrder: slide.sortOrder,
			});
		}

		setHasChangedTab(true);

		setCurrentTab(value);
	};

	const onAddRemoveTab = (e, action) => {
		const cpSlides = [...slides];

		if (action === 'add') {
			const key = Date.now().toString();

			const slideDefaultData = {
				key,
				title: '',
				description: '',
				sortOrder: 0,
				file: '',
			};

			cpSlides.push(slideDefaultData);

			form.setFieldsValue(slideDefaultData);

			setCurrentTab(key);
		}

		if (action === 'remove') {
			const removedIndex = cpSlides.findIndex(
				slide => slide.key.toString() === currentTab,
			);

			cpSlides.splice(removedIndex - 1, 1);
		}

		setHasChangedTab(true);

		setSlides(cpSlides);
	};

	const onChangeTabContent = (fieldKey, fieldValue) => {
		const slideIndex = slides.findIndex(slide => slide.key === currentTab);

		const cpSlides = [...slides];

		cpSlides[slideIndex] = {
			...cpSlides[slideIndex],
			[fieldKey]: fieldValue,
		};

		setHasChangedTab(true);

		setSlides(cpSlides);
	};

	const validationImageSlide = () => {
		let result = true;

		slides.forEach(slide => {
			if (!slide.file) {
				result = false;

				setCurrentTab(slide.key);

				form.setFields([
					{
						name: 'file',
						errors: [
							MESSAGE_FEEDBACK.HOMEPAGE.SLIDE_IMAGE_REQUIRED,
						],
					},
				]);
			}
		});

		return result;
	};

	const onSubmitFailed = () => {
		validationImageSlide();
	};

	const formatData = value => {
		const slideFormated = slides.map(slide => {
			if (slide?.file?.file) {
				return {
					...slide,
					file: slide?.file?.file?.response?.data?._id,
				};
			} else {
				return {
					...slide,
					file: slide?.file?._id,
				};
			}
		});

		const heroFormated = {
			...value,
			bigBanner: value?.bigBanner?.file?.response?.data?._id,
			smallBanner: value?.smallBanner?.file?.response?.data?._id,
		};

		const data = {
			...heroFormated,
			slides: slideFormated,
		};

		delete data.file;

		return data;
	};

	const onSubmit = async values => {
		const result = validationImageSlide();

		if (result) {
			const dataFormated = formatData(values);
			dataFormated.lang = language;

			try {
				if (!homepageDetail) {
					await api.homepage.create(dataFormated);
				} else {
					await api.homepage.update(
						homepageDetail?._id,
						dataFormated,
					);
				}

				alertSuccess(MESSAGE_FEEDBACK.COMMON.UPDATE_SUCCESS);
			} catch (err) {
				alertFail(MESSAGE_FEEDBACK.COMMON.UPDATE_FAIL);
			}
		}
	};

	return (
		<Form form={form} onFinish={onSubmit} onFinishFailed={onSubmitFailed}>
			<div className="slider-config">
				<h1 className="form-title">Ngôn ngữ</h1>
				<span>{LangEnum[language]}</span>
			</div>
			<Slides
				detail={homepageDetail}
				slides={slides}
				onChange={onChangeSlide}
				onAddRemoveTab={onAddRemoveTab}
				onChangeTabContent={onChangeTabContent}
				currentTab={currentTab}
			/>
			<Hero detail={homepageDetail} hasChangedTab={hasChangedTab} />
			<div className="btn-action-wrapper mt-5 text-right">
				<Button type="primary" htmlType="submit">
					Lưu thay đổi
				</Button>
			</div>
		</Form>
	);
};

GeneralHome.propTypes = {
	language: PropTypes.string,
};
