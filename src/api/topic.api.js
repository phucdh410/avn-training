import { MainApi } from './base.api';
import { stringify } from 'query-string';

export class TopicApi extends MainApi {
	constructor() {
		super('topics');
	}

	getList = async query => {
		const queryStr = stringify(query);

		return await this.get(`${queryStr ? '?' + queryStr : ''}`);
	};

	getListTopicPaging = async query => {
		const queryStr = stringify(query);

		return await this.get(`/paging/${queryStr ? '?' + queryStr : ''}`);
	};

	create = async data => await this.post('/create', data);

	updateById = async (id, data) =>
		await this.put(`/update/updateById/${id}`, data);

	updateActiveStatus = async (id, status) =>
		await this.put(`/update/hideById/${id}`, { status });

	updatePinStatus = async (id, status) =>
		await this.put(`/update/pinById/${id}`, { status });

	deleteById = async id => await this.delete(`/delete/deleteById/${id}`);
}
