import { http } from '$lib/service/auth';

export async function getOrganizations() {
	try {
		const { data } = await http.get('settings/organizations/');
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

export async function getOrganization(id) {
	try {
		const { data } = await http.get(`settings/organizations/${id}/`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400
		});
	}
}

export async function updateOrganization(payload) {
	try {
		const { data } = await http.put(`settings/organizations/${payload.id}/`, payload);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}

export async function createOrganization(payload) {
	try {
		const { data } = await http.post(`settings/organizations/`, payload);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}

export async function deleteOrganization(id: number) {
	try {
		return http.delete(`settings/organizations/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
