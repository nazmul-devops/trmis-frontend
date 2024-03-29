import { http } from '$lib/service/auth';

export async function getBatchParticipants(id) {
	try {
		const { data } = await http.get(`batch/${id}/batch-trainee/`);
		console.log(data);
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


export async function deleteBatchParticipant(batchId: number, participantId: number) {
	try {
		return http.delete(`batch/${batchId}/batch-trainee/${participantId}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function createBatchParticipant(batchId, payload) {
	try {
		const { data } = await http.post(`batch/${batchId}/batch-trainee/`, payload);
		return {
			status: 201,
			data,
			errorMessage: null
		};
	} catch (err) {
		return Promise.resolve({
			status: 403,
			errorMessage: err.response.data.detail,
			data: []
		});
	}
}
