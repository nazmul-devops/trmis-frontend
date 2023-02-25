import { http } from '$lib/service/auth';

export async function getBatchSessions(id) {
	try {
		const { data } = await http.get(`batch/${id}/session-details/`);
		return {
			status: 200,
			data: data.map((item) => ({ ...item, id: item.trainer }))
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

export async function deleteBatchSession(batchId: number, sessionId: number) {
	try {
		return http.delete(`batch/${batchId}/session-details/${sessionId}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
export async function updateBatchSession(batchId, payload) {
	try {
		const { data } = await http.post(`batch/${batchId}/session-details/`, payload);
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

export async function createBatchSession(batchId, payload) {
	try {
		const { data } = await http.post(`batch/${batchId}/session-details/`, payload);
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
