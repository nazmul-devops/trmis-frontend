import { http } from '$lib/service/auth';

export async function getTrainers() {
	try {
		const { data } = await http.get('trainer/');

		return {
			status: 200,
			data: data.map((item, index) => ({ ...item, id: index }))
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

export async function getTrainer(id) {
	try {
		const { data } = await http.get(`trainer/${id}/`);
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

export async function deleteTrainer(id: number) {
	try {
		return http.delete(`trainer/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateTrainer(payload) {
	try {
		const { data } = await http.put(`trainer/${payload.phone}/`, payload);
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

export async function createTrainer(payload) {
	try {
		const { data } = await http.post(`trainer/`, payload);
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
