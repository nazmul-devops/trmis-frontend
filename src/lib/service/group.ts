import { http } from '$lib/service/auth';

export async function getGroups() {
	try {
		const { data } = await http.get('group/');

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

export async function getGroup(id) {
	console.log(id);
	try {
		const { data } = await http.get(`group/${id}/`);
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

export async function deleteGroup(id: number) {
	try {
		return http.delete(`group/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateGroup(payload) {
	try {
		const { data } = await http.put(`group/${payload.id}/`, payload);
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

export async function createGroup(payload) {
	try {
		const { data } = await http.post(`group/`, payload);
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
