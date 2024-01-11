import api from 'src/api';
import CategoryTypes from './category.type';
import { convertStrToNumber } from 'src/utils/function.util';

export const onGetAllCategory = (
	query = {},
	currentUrl,
	cb,
) => async dispatch => {
	try {
		const result = await api.category.getListCategoryPaging(query);

		dispatch({
			type: CategoryTypes.GET_ALL_CATEGORY,
			payload: {
				data: result?.data?.data,
				total: result?.data?.total,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});

		cb && cb(true, result.data);
	} catch (err) {
		dispatch({
			type: CategoryTypes.GET_ALL_CATEGORY,
			payload: {
				data: [],
				total: 0,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});
		cb && cb(false, err.message);
	}
};

export const onGetListCategoryByTopic = (
	query = {},
	currentUrl,
	cb,
) => async dispatch => {
	try {
		const result = await api.category.getListCategoryByTopic(
			query?.topicId,
		);

		dispatch({
			type: CategoryTypes.GET_LIST_CATEGORY,
			payload: {
				data: result?.data?.data,
				total: result?.data?.total,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});

		cb && cb(true, result.data);
	} catch (err) {
		dispatch({
			type: CategoryTypes.GET_LIST_CATEGORY,
			payload: {
				data: [],
				total: 0,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});
		cb && cb(false, err.message);
	}
};

export const onGetListCategoriesByTopic = (
	topicId,
	query = {},
	currentUrl,
	cb,
) => async dispatch => {
	try {
		if (!query || !query?.page) {
			query.page = 1;
		}

		if (topicId) {
			query.topicId = topicId;
		}

		const result = await api.category.getListCategoryPaging(query);

		dispatch({
			type: CategoryTypes.GET_LIST_CATEGORY_BY_TOPIC,
			payload: {
				data: result?.data?.data,
				total: result?.data?.total,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});

		cb && cb(true, result.data);
	} catch (err) {
		dispatch({
			type: CategoryTypes.GET_LIST_CATEGORY_BY_TOPIC,
			payload: {
				data: [],
				total: 0,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});
		cb && cb(false, err.message);
	}
};

export const onCreateCategory = (data, cb) => async dispatch => {
	try {
		const result = await api.category.create(data);

		dispatch({
			type: CategoryTypes.CREATE_CATEGORY,
			payload: {
				...result?.data,
				banner: data?.bannerFile,
				bigBanner: data?.bigBannerFile,
			},
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdateCategory = (id, data, cb) => async dispatch => {
	try {
		const result = await api.category.updateById(id, data);

		dispatch({
			type: CategoryTypes.UPDATE_CATEGORY,
			payload: {
				...result?.data,
			},
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdateActiveCategory = (id, status, cb) => async dispatch => {
	try {
		const result = await api.category.updateActiveStatus(id, status);

		dispatch({
			type: CategoryTypes.HIDE_CATEGORY,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onDeleteCategory = (id, cb) => async dispatch => {
	try {
		const result = await api.category.deleteById(id);

		dispatch({
			type: CategoryTypes.DELETE_CATEGORY,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};
