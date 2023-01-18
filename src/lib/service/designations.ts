import { http } from '$lib/service/auth';

export async function getDesignations() {
	try {
		const { data } = await http.get('settings/designations/');

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

export async function getDesignation(id) {
	console.log(id);
	try {
		const { data } = await http.get(`settings/designations/${id}/`);
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

export async function deleteDesignation(id: number) {
	try {
		return http.delete(`settings/designations/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateDesignation(payload) {
	try {
		const { data } = await http.put(`settings/designations/${payload.id}/`, payload);
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

export async function createDesignation(payload) {
	try {
		const { data } = await http.post(`settings/designations/`, payload);
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
