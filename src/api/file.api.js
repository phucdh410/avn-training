import { MainApi } from './base.api.js';
import axios from 'axios';
import FormData from 'form-data';

export class FileApi extends MainApi {
	constructor() {
		super('files');
	}

	uploadSingleFile = async (file, sourceType) => {
		const data = new FormData();

		const token = localStorage.getItem('token');

		data.append('file', file);

		const config = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
			url: this.URL + '/upload',
			data: data,
		};

		data.append('sourceType', sourceType);

		return axios(config)
			.then(res => (res ? res.data : res))
			.catch(err => {
				throw err.response?.data;
			});
	};
}
