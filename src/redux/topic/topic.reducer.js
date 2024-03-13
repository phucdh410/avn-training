import TopicType from './topic.type';

const INITIAL_STATE = {
	topics: {
		data: null,
		total: 0,
		page: null,
		currentUrl: null,
	},
	normalTopics: {
		data: null,
	},
};

const TopicReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case TopicType.GET_LIST_TOPIC:
			return {
				...state,
				topics: payload,
			};
		case TopicType.GET_LIST_TOPIC_PAGING:
			return {
				...state,
				topics: payload,
			};
		case TopicType.CREATE_TOPIC:
			return state.topics.data
				? {
						...state,
						topics: {
							data: [payload, ...state.topics.data],
						},
				  }
				: { ...state };
		case TopicType.UPDATE_TOPIC:
			return state.topics.data
				? {
						...state,
						topics: {
							...state.topics,
							data: state.topics.data.map(item => {
								if (item._id !== payload._id) return item;
								else
									return {
										...item,
										...payload,
									};
							}),
						},
				  }
				: { ...state };
		case TopicType.DELETE_TOPIC:
			return {
				...state,
				topics: {
					data: [
						...state.topics.data.filter(
							newDetail => newDetail._id !== payload._id,
						),
					],
					total: state.topics.total - 1,
					page: state.topics.page,
				},
			};
		case TopicType.HIDE_TOPIC:
			return state.topics.data
				? {
						...state,
						topics: {
							...state.topics,
							data: state.topics.data.map(item => {
								if (item._id !== payload._id) return item;
								else return payload;
							}),
						},
				  }
				: { ...state };
		case TopicType.PIN_TOPIC:
			return state.topics.data
				? {
						...state,
						topics: {
							...state.topics,
							data: state.topics.data.map(item => {
								if (item._id !== payload._id) return item;
								else return payload;
							}),
						},
				  }
				: { ...state };
		case TopicType.GET_NORMAL_TOPIC:
			return {
				...state,
				normalTopics: payload,
			};
		default:
			return state;
	}
};

export default TopicReducer;
