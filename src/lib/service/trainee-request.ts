import { http } from '$lib/service/auth';

export async function getTrainee_Requests() {
	try {
		const { data } = await http.get('trainee/trainee-request/');

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

export async function getTrainee_Request(id) {
	try {
		const { data } = await http.get(`trainee/trainee-request/${id}/`);
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

// export async function deleteTrainee_Request(id: number) {
// 	try {
// 		return http.delete(`trainer/${id}/`);
// 	} catch (err) {
// 		return Promise.resolve();
// 	}
// }

export async function updateTrainee_Request(payload) {
	try {
		const { data } = await http.put(`trainee/trainee-request/${payload.id}/`, payload);
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

export async function createTrainee_Request(payload) {
	try {
		const { data } = await http.post(`trainee/trainee-request/`, payload);
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
