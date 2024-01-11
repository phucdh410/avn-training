import { MainApi } from './base.api';

export class AuthApi extends MainApi {
	constructor() {
		super('auth');
	}

	getProfile = async () => await this.get('/profile');

	login = async ({ username, password }) =>
		await this.post('/login', { username, password });

	redirect = async ({ redirectUri }) =>
		await this.post('/azure/redirect?clientId=apim-api-training-ms', {
			redirectUri,
		});

	loginAzure = async ({ code }) => await this.post('/azure/login', { code });
}
