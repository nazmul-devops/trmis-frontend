import axios from 'axios';
import { emitter } from './event-bus';

export const httpWeb = axios.create({ baseURL: 'https://trmisapi.inneedcloud.com/api/' });

export const http = axios.create({ baseURL: 'https://trmisapi.inneedcloud.com/api/' });

http.interceptors.response.use(
	(res) => res,
	async (err) => {
		const originalConfig = err.config;
		if (err.response) {
			if (err.response.status === 401 && !originalConfig?.sent) {
				originalConfig._retry = true;
				try {
					const rs = await refresh();
					const { access } = rs.data;
					localStorage.setItem('accessToken', access);
					// http.defaults.headers.common = {
					// 	Authorization: `Bearer ${access}`
					// };

					originalConfig.headers['Authorization'] = `Bearer ${access}`;
					return http(originalConfig);
					// const config = {
					// 	...originalConfig,
					// 	_retry: true,
					// 	Authorization: `Bearer ${access}`
					// };
					// return http(config);
				} catch (_error) {
					if (_error.response && _error.response.data) {
						return Promise.reject(_error.response.data);
					}
					return Promise.reject(_error);
				}
			}
			if (err.response.status === 403 && err.response.data) {
				emitter.emit('http_403:access_forbidden');
				return Promise.reject(err.response.data);
			}
		}
		return Promise.reject(err);
	}
);

export function setupAuthHeader() {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		http.defaults.headers.common = {
			Authorization: `Bearer ${accessToken}`
		};
	}
}

function removeAuthHeader() {
	http.defaults.headers.common = null;
}

export function logout() {
	localStorage.clear();
	removeAuthHeader();
}

export async function refresh() {
	const _refresh = localStorage.getItem('refreshToken');
	try {
		const resp = await axios.post('https://trmisapi.inneedcloud.com/api/token-refresh/', {
			refresh: _refresh
		});
		return resp;
		console.log(resp);
	} catch (err) {
		return Promise.reject();
		console.log(err);
	}
}

export async function login(username, password) {
	try {
		const {
			data: { access, user, refresh }
		} = await axios.post('https://trmisapi.inneedcloud.com/api/token/', { username, password });
		localStorage.setItem('accessToken', access);
		localStorage.setItem('refreshToken', refresh);

		setupAuthHeader();

		return Promise.resolve({ status: 200, data: user });
	} catch ({ response }) {
		return Promise.resolve({ status: response.status, data: response.data });
	}
}
