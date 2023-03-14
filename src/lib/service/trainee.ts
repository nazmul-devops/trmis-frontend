import { http } from '$lib/service/auth';

export async function getTrainees() {
	try {
		const { data } = await http.get('trainee/');

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

export async function getTrainee(id) {
	try {
		const { data } = await http.get(`trainee/${id}/`);
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

export async function deleteTrainee(id: number) {
	try {
		return http.delete(`trainee/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateTrainee(payload) {
	try {
		const { data } = await http.put(`trainee/${payload.id}/`, payload);
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

export async function createTrainee(payload) {
	try {
		const { data } = await http.post(`trainee/`, payload);
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
