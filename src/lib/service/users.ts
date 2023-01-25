import { http } from '$lib/service/auth';

export async function getUsers() {
	try {
		const {
			data: { data }
		} = await http.get('users/');

		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

export async function getUser(id) {
	try {
		const { data } = await http.get(`users/${id}/`);
		return {
			status: 200,
			data: data
		};
	} catch (error) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

export async function deleteUser(id: number) {
	try {
		return http.delete(`users/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateUser(payload) {
	try {
		const { data } = await http.put(`users/${payload.id}/`, payload);
		return {
			status: 204,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}

export async function createUser(payload) {
	try {
		const { data } = await http.post(`user-registration/`, payload);
		return {
			status: 201,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}
