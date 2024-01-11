import { MainApi } from './base.api';

export class HomepageApi extends MainApi {
	constructor() {
		super('homepage');
	}

	getHomePageByLanguage = async query => {
		return await this.get(`/findByLang/${query.lang}`);
	};

	create = async data => await this.post('/create', data);

	update = async (id, data) => await this.put(`/update/${id}`, data);
}
