export const API_URL = process.env.REACT_APP_API_URL;

export const WEB_URL = process.env.REACT_APP_WEB_URL;

export const API_VERSION = process.env.REACT_APP_VERSION;

export const YOUTUBE_PLAY_URL = 'https://www.youtube.com/watch?v=';

export const METHOD_AXIOS = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
};

export const REGEX_PHONE = /(84|0[3|5|7|8|9])+([0-9]{8,9})\b/g;
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_ACTIONS = {
	VIEW: 'view',
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
	HIDE: 'hide',
};

export const POST_TYPE = {
	TEXT: 0,
	VIDEO: 1,
};

export const TEST_TYPE = {
	POST: 0,
	CATEGORY: 1,
};

export const ACCOUNT_TYPE = {
	ADMIN: 'admin',
	USER: 'user',
};
