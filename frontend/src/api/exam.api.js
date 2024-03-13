import { MainApi } from './base.api';

export class ExamApi extends MainApi {
	constructor() {
		super('exams');
	}

	getByCategoryId = id => this.get(`/getByCategory/${id}`);

	getByPostId = id => this.get(`/getByPostId/${id}`);
}
