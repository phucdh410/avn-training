import api from 'src/api';
import UserTypes from './user.type';
import { convertStrToNumber } from 'src/utils/function.util';

export const onGetListUser = (query = {}, currentUrl, cb) => async dispatch => {
	try {
		if (!query || !query?.page) {
			query.page = 1;
		}

		const result = await api.user.getListUser(query);

		dispatch({
			type: UserTypes.GET_LIST_USER,
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
			type: UserTypes.GET_LIST_USER,
			payload: {
				data: [],
				total: 1,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});
		cb && cb(false, err.message);
	}
};

export const onCreateUser = (data, cb) => async dispatch => {
	try {
		const result = await api.user.createUser(data);

		dispatch({
			type: UserTypes.CREATE_USER,
			payload: {
				...data,
				_id: result?.data?._id,
				active: true,
				userId: {
					department: data?.department,
					section: data?.department,
					unit: data?.unit,
					position: data?.position,
				},
			},
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err);
	}
};

export const onUpdateUser = (id, data, cb) => async dispatch => {
	try {
		const result = await api.user.updateById(id, data);

		dispatch({
			type: UserTypes.UPDATE_USER,
			payload: {
				...data,
				userId: {
					department: data?.department,
					section: data?.department,
					unit: data?.unit,
					position: data?.position,
				},
			},
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdateActiveUser = (id, status, cb) => async dispatch => {
	try {
		const result = await api.user.updateActiveStatus(id, status);

		dispatch({
			type: UserTypes.HIDE_USER,
			payload: {
				username: result?.data,
				active: status,
			},
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onDeleteUser = (id, cb) => async dispatch => {
	try {
		const result = await api.user.deleteById(id);

		dispatch({
			type: UserTypes.DELETE_USER,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};
