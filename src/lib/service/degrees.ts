import { http } from '$lib/service/auth';

export async function getDegrees() {
	try {
		const { data } = await http.get('degrees');

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

export async function getDegree(id) {
	console.log(id);
	try {
		const { data } = await http.get(`degrees/${id}`);
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

export async function deleteDegree(id: number) {
	try {
		return http.delete(`degrees/${id}`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateDegree(payload) {
	try {
		const { data } = await http.put(`degrees/${payload.id}`, payload);
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

export async function createDegree(payload) {
	try {
		const { data } = await http.post(`degrees`, payload);
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
