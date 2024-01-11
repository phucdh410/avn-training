import {
	API_URL,
	// API_VERSION,
	METHOD_AXIOS,
} from 'src/configs/constant.config';
import axios from 'axios';
import fileDownload from 'js-file-download';

export class MainApi {
	constructor(pathUrl) {
		this.URL = `${API_URL}/api/${pathUrl}`;
		// this.URL = `${API_URL}/api/${API_VERSION}/${pathUrl}`;
	}

	abstract = async (path, data, method = METHOD_AXIOS.GET) => {
		// const token = localStorage.getItem('token');
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NThiN2E1MDEzZjFhYTlhZTBmYjEyZTUiLCJ0b2tlbl9pZCI6IjE0MTVjNGJiLWVjYTMtNGZjOS1iZGJkLWU5MmU5YWM2NTU2MCIsIm5hbWUiOiJGb3IgR3VtaSB2ZW5kb3IgLSBUcmFpbmluZyBXZWJzaXRlIiwiYXZhdGFyIjoiIiwibGFuZyI6WyJ2aSIsImVuIl0sImdyb3VwIjoiYWRtaW4iLCJpYXQiOjE3MDQ5MzczODMsImV4cCI6MTcwNTAyMzc4M30.goumCHxX3hh98oS_Nwun5MBxZ0RIME6kiyyy78WJCBs';
		localStorage.setItem('token', token); // Xóa đi sau khi test

		const config = {
			method,
			headers: token
				? {
						Authorization: `Bearer ${token}`,
				  }
				: {
						'Content-Type': 'application/json;charset=UTF-8',
				  },
			url: `${this.URL}${path}`,
			data,
		};

		return axios(config)
			.then(res => (res ? res.data : res))
			.catch(err => {
				throw err.response?.data;
			});
	};

	download = async path => {
		const token = localStorage.getItem('token');

		const headers = {
			Authorization: `Bearer ${token}`,
			responseType: 'blob',
		};

		await axios
			.get(`${this.URL}${path}`, {
				headers,
				responseType: 'blob',
			})
			.then(({ data }) => fileDownload(data, 'report.xlsx'))
			.catch(err => console.log(err));
	};

	get = async (path, data) =>
		await this.abstract(path, data, METHOD_AXIOS.GET);

	post = async (path, data) =>
		await this.abstract(path, data, METHOD_AXIOS.POST);

	put = async (path, data) =>
		await this.abstract(path, data, METHOD_AXIOS.PUT);

	delete = async (path, data) =>
		await this.abstract(path, data, METHOD_AXIOS.DELETE);

	getAll = async () => await this.get('', undefined);

	getByID = async id => await this.get(`/getById/${id}`);

	getBySlug = async slug => await this.get(`/getBySlug/${slug}`);

	updateById = async (id, data) => await this.put(`/id?id=${id}`, data);

	deleteById = async id => await this.delete(`/id?id=${id}`);
}
