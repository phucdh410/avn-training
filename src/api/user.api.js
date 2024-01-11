import { MainApi } from './base.api';
import { stringify } from 'query-string';

export class UserApi extends MainApi {
	constructor() {
		super('accounts');
	}

	getListUser = async query => {
		const queryStr = stringify(query);

		return await this.get(`/users/${queryStr ? '?' + queryStr : ''}`);
	};

	createUser = async data => await this.post(`/create`, data);

	changePassword = async data =>
		await this.put(`/update/change-password`, data);

	updateById = async (id, data) =>
		await this.put(`/update/updateById/${id}`, data);

	updateActiveStatus = async (id, status) =>
		await this.put(`/update/updateActiveById/${id}`, { status });

	deleteById = async id => await this.delete(`/delete/deleteById/${id}`);
}
