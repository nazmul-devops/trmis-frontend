import { http } from '$lib/service/auth';

export async function getPlannedBatchs() {
	try {
		const { data } = await http.get('dashboard/planned-batch/');

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

export async function getPlannedBatch(id) {
	try {
		const { data } = await http.get(`dashboard/planned-batch/${id}/`);
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

export async function deletePlannedBatch(id: number) {
	try {
		return http.delete(`dashboard/planned-batch/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updatePlannedBatch(payload) {
	try {
		const { data } = await http.put(`dashboard/planned-batch/${payload.id}/`, payload);
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

export async function createPlannedBatch(payload) {
	try {
		const { data } = await http.post(`dashboard/planned-batch/`, payload);
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
