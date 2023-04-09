import { http } from '$lib/service/auth';

export async function getBatchResources(id) {
	try {
		const { data } = await http.get(`batch/${id}/batch-trainer/`);
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

export async function deleteBatchResource(batchId: number, participantId: number) {
	try {
		return http.delete(`batch/${batchId}/batch-trainer/${participantId}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function createBatchResource(batchId, payload) {
	try {
		const { data } = await http.post(`batch/${batchId}/batch-trainer/`, payload);
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
