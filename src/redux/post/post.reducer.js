import PostType from './post.type';

const INITIAL_STATE = {
	posts: {
		data: null,
		total: 0,
		page: null,
		currentUrl: null,
	},
};

const PostReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case PostType.GET_LIST_POST:
			return {
				...state,
				posts: payload,
			};
		case PostType.GET_LIST_POST_PAGING:
			return {
				...state,
				posts: payload,
			};
		case PostType.CREATE_POST:
			return state.posts.data
				? {
						...state,
						posts: {
							data: [payload, ...state.posts.data],
						},
				  }
				: { ...state };
		case PostType.UPDATE_POST:
			return state.posts.data
				? {
						...state,
						posts: {
							...state.posts,
							data: state.posts.data.map(item => {
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
		case PostType.DELETE_POST:
			return {
				...state,
				posts: {
					data: [
						...state.posts.data.filter(
							post => post._id !== payload._id,
						),
					],
					total: state.posts.total - 1,
					page: state.posts.page,
				},
			};
		case PostType.HIDE_POST:
			return state.posts.data
				? {
						...state,
						posts: {
							data: state.posts.data.map(item => {
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

export default PostReducer;
