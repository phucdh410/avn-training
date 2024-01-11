import { REGEX_PHONE, REGEX_EMAIL } from 'src/configs/constant.config';
import { MESSAGE_FEEDBACK } from 'src/configs/message.config';

export const trimSpace = value => (value ? value.replace(/\s+/g, '') : '');

export const trimStartSpace = value => (value ? value.trimStart() : '');

export const validatePhoneNumber = phone =>
	phone && phone.match(REGEX_PHONE) ? true : false;

export const validateEmail = email => (email.match(REGEX_EMAIL) ? true : false);

export const FORM_NORMALIZE = {
	COMMON: {
		CLEAR_ALL_WHITESPACE: value => trimSpace(value),
		CLEAR_START_WHITEPSACE: value => trimStartSpace(value),
	},
};

export const FORM_RULES = {
	AUTH: {
		USERNAME: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.MSSV_REQUIRED,
			},
		],
		PASSWORD: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.PASSWORD_REQUIRED,
			},
			{
				min: 6,
				message: MESSAGE_FEEDBACK.USER.PASSWORD_LENGTH,
			},
		],
	},
	USER: {
		MSSV: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.MSSV_REQUIRED,
			},
		],
		PASSWORD: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.PASSWORD_REQUIRED,
			},
			{
				min: true,
				message: MESSAGE_FEEDBACK.USER.PASSWORD_REQUIRED,
			},
		],
		NAME: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.NAME_REQUIRED,
			},
		],
		EMAIL: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.EMAIL_REQUIRED,
				type: 'email',
			},
		],
		GENDER: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.GENDER_REQUIRED,
			},
		],
		DEPARTMENT: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.DEPARTMENT_REQUIRED,
			},
		],
		SECTION: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.SECTION_REQUIRED,
			},
		],
		UNIT: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.UNIT_REQUIRED,
			},
		],
		POSITION: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.POSITION_REQUIRED,
			},
		],
		OLD_PASSWORD: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.OLD_PASSWORD_REQUIRED,
			},
		],
		NEW_PASSWORD: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.NEW_PASSWORD_REQUIRED,
			},
		],
		CONFIRM_PASSWORD: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.USER.CONFIRM_PASSWORD_REQUIRED,
			},
		],
		PHONE: [
			{
				validator: (_, value) => {
					if (value) {
						return validatePhoneNumber(value)
							? Promise.resolve()
							: Promise.reject(
									new Error(
										MESSAGE_FEEDBACK.COMMON.MOBILE_NOT_VALID,
									),
							  );
					} else {
						return Promise.resolve();
					}
				},
			},
		],
	},
	TOPIC: {
		NAME: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.TOPIC.NAME_REQUIRED,
			},
		],
		DESCRIPTION: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.TOPIC.DESCRIPTION_REQUIRED,
			},
		],
		BANNER: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.TOPIC.BANNER,
			},
		],
	},
	POST: {
		LANG: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.LANG_REQUIRED,
			},
		],
		TITLE: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.TITLE_REQUIRED,
			},
		],
		DESCRIPTION: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.DESCRIPTION_REQUIRED,
			},
		],
		TOPIC: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.TOPIC_REQUIRED,
			},
		],
		CATEGORY: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.CATEGORY_REQUIRED,
			},
		],
		BANNER: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.BANNER_REQUIRED,
			},
		],
		TYPE: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.TEST_TYPE_REQUIRED,
			},
		],
		VIDEO_ID: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.VIDEO_ID_REQUIRED,
			},
		],
		TEST_TYPE: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.TEST_TYPE_REQUIRED,
			},
		],
		TEST_LINK: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.POST.TEST_LINK_REQUIRED,
			},
		],
	},
	CATEGORY: {
		TOPIC: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.CATEGORY.TOPIC_REQUIRED,
			},
		],
	},
	HOMEPAGE: {
		INTRODUCE: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.HOMEPAGE.INTRODUCE_REQUIRED,
			},
		],
		BIG_BANNER: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.HOMEPAGE.BIG_BANNER_REQUIRED,
			},
		],
		SMALL_BANNER: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.HOMEPAGE.SMALL_BANNER_REQUIRED,
			},
		],
		SLIDE_IMAGE: [
			{
				required: true,
				message: MESSAGE_FEEDBACK.HOMEPAGE.SLIDE_IMAGE_REQUIRED,
			},
		],
	},
};
