import UserType from './user.type';

const INITIAL_STATE = {
	users: {
		data: null,
		total: 0,
		page: null,
		currentUrl: null,
	},
};

const UserReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case UserType.GET_LIST_USER:
			return {
				...state,
				users: payload,
			};

		case UserType.CREATE_USER:
			return state.users.data
				? {
						...state,
						users: {
							data: [payload, ...state.users.data],
						},
				  }
				: { ...state };
		case UserType.UPDATE_USER:
			return state.users.data
				? {
						...state,
						users: {
							data: state.users.data.map(item => {
								if (item.username !== payload.username)
									return item;
								else
									return {
										...item,
										...payload,
									};
							}),
						},
				  }
				: { ...state };
		case UserType.DELETE_USER:
			return {
				...state,
				users: {
					...state.users,
					data: [
						...state.users.data.filter(
							user => user.username !== payload,
						),
					],
					total: state.users.total - 1,
				},
			};
		case UserType.HIDE_USER:
			return state.users.data
				? {
						...state,
						users: {
							data: state.users.data.map(item => {
								if (item.username !== payload.username)
									return item;
								else
									return {
										...item,
										...payload,
									};
							}),
						},
				  }
				: { ...state };
		default:
			return state;
	}
};

export default UserReducer;
