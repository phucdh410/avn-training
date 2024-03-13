import { MainApi } from './base.api';
import { stringify } from 'query-string';

export class PostUserApi extends MainApi {
	constructor() {
		super('post-users');
	}

	getUserViewdReport = async () => await this.get(`/getUserViewedReport`);

	getListPostUserViewedPaging = async (postId, query) => {
		const queryStr = stringify(query);

		return await this.get(
			`/getByPostId/${postId}${queryStr ? '?' + queryStr : ''}`,
		);
	};

	exportUserViewed = async (postId, query) => {
		const queryStr = stringify(query);

		return await this.download(
			`/exportByPostId/${postId}?limit=9999999999${
				queryStr ? '&' + queryStr : ''
			}`,
		);
	};

	updateStatusViewed = async ({ postId, duration, done }) => {
		return await this.put(`/updateDoneStatus/${postId}`, {
			duration,
			done,
		});
	};
}
