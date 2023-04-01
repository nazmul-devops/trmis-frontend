import { http } from '$lib/service/auth';
import { generateFromData } from '$lib/service/utilities';

export async function getTrainers() {
	try {
		const { data } = await http.get('trainer/');

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
		const { data } = await http.put(`trainer/${payload.id}/`, payload);
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

export async function uploadExel(payload) {
	try {
		const formData = await generateFromData(payload);
		const { data } = await http({
			method: 'POST',
			url: 'trainer/upload-excel/',
			data: formData,
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		return {
			status: 201,
			errorRows: data.error,
			errorMessage: data.error_msg,
			successRows: data.success
		};
	} catch (err) {
		return Promise.resolve({
			status: 403,
			errorRows: [],
			errorMessage: 'No Message',
			successRows: 0
		});
	}
}
