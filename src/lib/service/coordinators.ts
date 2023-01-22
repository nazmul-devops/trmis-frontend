import { http } from '$lib/service/auth';

export async function getCoordinators() {
	try {
		const { data } = await http.get('settings/coordinators/');
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

export async function getCoordinator(id) {
	try {
		const { data } = await http.get(`settings/coordinators/${id}/`);
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

export async function updateCoordinator(payload) {
	try {
		const { data } = await http.put(`settings/coordinators/${payload.id}/`, payload);
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

export async function createCoordinator(payload) {
	try {
		const { data } = await http.post(`settings/coordinators/`, payload);
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

export async function deleteCoordinator(id: number) {
	try {
		return http.delete(`settings/coordinators/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
