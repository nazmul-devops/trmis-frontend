import { http } from '$lib/service/auth';

export async function getCordinators() {
	try {
		const { data } = await http.get('trainingCordinators');
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

export async function getCordinator(id) {
	try {
		const { data } = await http.get(`trainingCordinators/${id}`);
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

export async function updateCordinator(payload) {
	try {
		const { data } = await http.put(`trainingCordinators/${payload.id}`, payload);
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

export async function createCordinator(payload) {
	try {
		const { data } = await http.post(`trainingCordinators`, payload);
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

export async function deleteCordinator(id: number) {
	try {
		return http.delete(`trainingCordinators/${id}`);
	} catch (err) {
		return Promise.resolve();
	}
}
