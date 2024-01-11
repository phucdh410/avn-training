export const ROUTE_CLIENT = {
	HOMEPAGE: '/',
	TOPIC: {
		BASE: '/topic',
		PIN: '/pin-topic',
	},
	CATEGORY: {
		BASE: '/category',
		DETAIL: '/detail',
	},
	POST: {
		BASE: '/post',
	},
	404: {
		BASE: '/404',
	},
};

export const ROUTE_ADMIN = {
	AUTH: {
		LOGIN: '/login',
		LOGIN_AZURE: '/azureLogin',
	},
	DASHBOARD: '/admin',
	NOT_FOUND: '/404',
	TOPIC: {
		BASE: '/admin/topic',
		LIST: '/list',
		VIEW: '/detail',
		CATEGORY: '/category',
	},
	ACCOUNT: {
		BASE: '/admin/account',
		LIST: '/list',
		IMPORT: '/import',
		PROFILE: '/profile',
		CHANGE_PASSWORD: '/change-password',
	},
	POST: {
		BASE: '/admin/post',
		LIST: '/list',
		CREATE: '/create',
		EDIT: '/edit',
		DETAIL: '/detail',
		USER_VIEWED: '/user-viewed',
	},
	PAGE_CONFIG: {
		BASE: '/admin/page-config',
		HOMEPAGE: '/homepage',
	},
};

export const ROUTE_IT = {
	BASE: '/it',
	AZURE_CONFIG: '/azure-config',
};
