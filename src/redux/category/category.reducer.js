import CategoryType from './category.type';

const INITIAL_STATE = {
	categories: {
		data: null,
		total: 0,
		page: null,
		currentUrl: null,
	},
};

const TopicReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case CategoryType.GET_ALL_CATEGORY:
			return {
				...state,
				categories: payload,
			};
		case CategoryType.GET_LIST_CATEGORY:
			return {
				...state,
				categories: payload,
			};
		case CategoryType.GET_LIST_CATEGORY_BY_TOPIC:
			return {
				...state,
				categories: payload,
			};
		case CategoryType.CREATE_CATEGORY:
			return state.categories.data
				? {
						...state,
						categories: {
							data: [payload, ...state.categories.data],
						},
				  }
				: { ...state };
		case CategoryType.UPDATE_CATEGORY:
			return state.categories.data
				? {
						...state,
						categories: {
							data: state.categories.data.map(item => {
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
		case CategoryType.DELETE_CATEGORY:
			return {
				...state,
				categories: {
					data: [
						...state.categories.data.filter(
							category => category._id !== payload._id,
						),
					],
					total: state.categories.total - 1,
					page: state.categories.page,
				},
			};
		case CategoryType.HIDE_CATEGORY:
			return state.categories.data
				? {
						...state,
						categories: {
							data: state.categories.data.map(item => {
								if (item._id !== payload._id) return item;
								else return payload;
							}),
						},
				  }
				: { ...state };
		default:
			return state;
	}
};

export default TopicReducer;
