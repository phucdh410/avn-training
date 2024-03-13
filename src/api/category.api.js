import { MainApi } from './base.api';
import { stringify } from 'query-string';

export class CategoryApi extends MainApi {
	constructor() {
		super('post-categories');
	}

	getListCategoryPaging = async query => {
		const queryStr = stringify(query);

		return await this.get(`/paging/${queryStr ? '?' + queryStr : ''}`);
	};

	getListCategoryByTopic = async (topicId, query) => {
		const queryStr = stringify(query);

		return await this.get(
			`/getByTopicId/${topicId}${queryStr ? '?' + queryStr : ''}`,
		);
	};

	create = async data => await this.post('/create', data);

	updateById = async (id, data) =>
		await this.put(`/update/updateById/${id}`, data);

	updateActiveStatus = async (id, status) =>
		await this.put(`/update/hideById/${id}`, { status });

	deleteById = async id => await this.delete(`/delete/deleteById/${id}`);
}
