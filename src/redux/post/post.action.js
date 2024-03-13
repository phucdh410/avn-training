import api from 'src/api';
import PostTypes from './post.type';
import { convertStrToNumber } from 'src/utils/function.util';

export const onGetAllPost = (query = {}, currentUrl, cb) => async dispatch => {
	try {
		const result = await api.post.getAll(query);

		dispatch({
			type: PostTypes.GET_LIST_POST,
			payload: {
				data: result?.data,
				total: result?.data?.length,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});

		cb && cb(true, result.data);
	} catch (err) {
		dispatch({
			type: PostTypes.GET_LIST_POST,
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

export const onGetListPostPaging = (
	query = {},
	currentUrl,
	cb,
) => async dispatch => {
	try {
		if (!query || !query?.page) {
			query.page = 1;
		}

		const result = await api.post.getListPostPaging(query);

		dispatch({
			type: PostTypes.GET_LIST_POST_PAGING,
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
			type: PostTypes.GET_LIST_POST_PAGING,
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

export const onCreatePost = (data, cb) => async dispatch => {
	try {
		const result = await api.post.create(data);

		dispatch({
			type: PostTypes.CREATE_POST,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdatePost = (id, data, cb) => async dispatch => {
	try {
		const result = await api.post.updateById(id, data);

		dispatch({
			type: PostTypes.UPDATE_POST,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdateActivePost = (id, status, cb) => async dispatch => {
	try {
		const result = await api.post.updateActiveStatus(id, status);

		dispatch({
			type: PostTypes.HIDE_POST,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onDeletePost = (id, cb) => async dispatch => {
	try {
		const result = await api.post.deleteById(id);

		dispatch({
			type: PostTypes.DELETE_POST,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};
