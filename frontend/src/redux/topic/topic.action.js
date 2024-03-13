import api from 'src/api';
import TopicTypes from './topic.type';
import { convertStrToNumber } from 'src/utils/function.util';

export const onGetAllTopic = (query = {}, currentUrl, cb) => async dispatch => {
	try {
		const result = await api.topic.getList(query);

		dispatch({
			type: TopicTypes.GET_LIST_TOPIC,
			payload: {
				data: result?.data,
				total: result?.data?.length,
				page: 1,
				currentUrl,
			},
		});

		cb && cb(true, result.data);
	} catch (err) {
		dispatch({
			type: TopicTypes.GET_LIST_TOPIC,
			payload: {
				data: [],
				total: 0,
				page: 1,
				currentUrl,
			},
		});
		cb && cb(false, err.message);
	}
};

export const onGetAllNormalTopic = (
	query = {},
	currentUrl,
	cb,
) => async dispatch => {
	try {
		const result = await api.topic.getList(query);

		dispatch({
			type: TopicTypes.GET_NORMAL_TOPIC,
			payload: {
				data: result?.data,
				total: result?.data?.length,
				page: 1,
				currentUrl,
			},
		});

		cb && cb(true, result.data);
	} catch (err) {
		dispatch({
			type: TopicTypes.GET_NORMAL_TOPIC,
			payload: {
				data: [],
				total: 0,
				page: 1,
				currentUrl,
			},
		});
		cb && cb(false, err.message);
	}
};

export const onGetListTopicPaging = (
	query = {},
	currentUrl,
	cb,
) => async dispatch => {
	try {
		if (!query || !query?.page) {
			query.page = 1;
		}

		const result = await api.topic.getListTopicPaging(query);

		dispatch({
			type: TopicTypes.GET_LIST_TOPIC_PAGING,
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
			type: TopicTypes.GET_LIST_TOPIC_PAGING,
			payload: {
				data: [],
				total: 0,
				page: convertStrToNumber(query.page, 1),
				currentUrl,
			},
		});
		// cb && cb(false, err.message);
	}
};

export const onCreateTopic = (data, cb) => async dispatch => {
	try {
		const result = await api.topic.create(data);

		dispatch({
			type: TopicTypes.CREATE_TOPIC,
			payload: {
				...result?.data,
				banner: data?.file,
			},
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdateTopic = (id, data, cb) => async dispatch => {
	try {
		const result = await api.topic.updateById(id, data);

		dispatch({
			type: TopicTypes.UPDATE_TOPIC,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdateActiveTopic = (id, status, cb) => async dispatch => {
	try {
		const result = await api.topic.updateActiveStatus(id, status);

		dispatch({
			type: TopicTypes.HIDE_TOPIC,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onUpdatePinTopic = (id, status, cb) => async dispatch => {
	try {
		const result = await api.topic.updatePinStatus(id, status);

		dispatch({
			type: TopicTypes.PIN_TOPIC,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};

export const onDeleteTopic = (id, cb) => async dispatch => {
	try {
		const result = await api.topic.deleteById(id);

		dispatch({
			type: TopicTypes.DELETE_TOPIC,
			payload: result?.data,
		});

		cb && cb(true, result?.data);
	} catch (err) {
		cb && cb(false, err.message);
	}
};
