import axios from 'axios';

export const http = axios.create({ baseURL: 'http://localhost:3000' });

export function setupAuthHeader() {
	// console.log('setupAuthHeader');
	let accessToken = localStorage.getItem('accessToken');
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

export async function login(username: String, password: String) {
	console.log('ok');
	try {
		const {
			data: { accessToken, user }
		} = await axios.post('http://localhost:3000/login', {
			email: username,
			password: password
		});
		localStorage.setItem('accessToken', accessToken);
		setupAuthHeader();

		return Promise.resolve({ status: 200, data: user });
	} catch ({ response }) {
		return Promise.resolve({ status: response.status, data: response.data });
	}
}
