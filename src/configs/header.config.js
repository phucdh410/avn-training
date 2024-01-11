export const REQUEST_HEADER = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
	Authorization: `Bearer ${localStorage.getItem('token')}`,
};
