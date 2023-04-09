import { http } from '$lib/service/auth';
import { generateFromData } from '$lib/service/utilities';

export async function getBatches() {
	try {
		const { data } = await http.get('batch/');
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

export async function getBatch(id) {
	try {
		const { data } = await http.get(`batch/${id}/`);
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

export async function deleteBatch(id: number) {
	try {
		return http.delete(`batch/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateBatch(payload) {
	try {
		const { data } = await http.put(`batch/${payload.id}/`, payload);
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

export async function createBatch(payload) {
	try {
		const { data } = await http.post(`batch/`, payload);
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

export async function uploadExel(id, payload) {
	try {
		const formData = await generateFromData(payload);
		const { data } = await http({
			method: 'POST',
			url: `batch/${id}/upload-excel/`,
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
