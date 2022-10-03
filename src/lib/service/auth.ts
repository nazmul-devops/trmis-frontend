import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const http = axios.create({ baseURL: 'http://localhost:3000' });

export async function login(username: String, password: String) {
	try {
		const {
			data: { accessToken, user }
		} = await axios.post('http://localhost:3000/login', {
			email: username,
			password: password
		});

		localStorage.setItem('accessToken', accessToken);
		http.defaults.headers.common = {
			Authorization: `Bearer ${accessToken}`
		};
        return Promise.resolve({ status: 200, data: user});
	} catch ({ response }) {
		return Promise.resolve({ status: response.status, data: response.data });
	}
}
