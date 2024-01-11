import { MainApi } from './base.api';
import { stringify } from 'query-string';

export class PostApi extends MainApi {
	constructor() {
		super('posts');
	}

	getListPostPaging = async query => {
		const queryStr = stringify(query);

		return await this.get(`/paging${queryStr ? '?' + queryStr : ''}`);
	};

	userGetByCategoryId = async (id, query) => {
		const queryStr = stringify(query);

		return await this.get(
			`/user/getByCategoryId/${id}${queryStr ? '?' + queryStr : ''}`,
		);
	};

	getByCategoryId = async id => {
		return await this.get(`/getByCategoryId/${id}`);
	};

	create = async data => await this.post('/create', data);

	updateById = async (id, data) =>
		await this.put(`/update/updateById/${id}`, data);

	updateActiveStatus = async (id, status) =>
		await this.put(`/update/updateActiveById/${id}`, { status });

	deleteById = async id => await this.delete(`/delete/deleteById/${id}`);
}
