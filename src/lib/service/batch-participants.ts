import { http } from '$lib/service/auth';

export async function getBatchParticipants(id) {
	try {
		const { data } = await http.get(`batch/${id}/batch-trainee/`);
		return {
			status: 200,
			data: data.map((item) => ({ ...item, id: item.trainee }))
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

// export async function getBatchParticipant(id) {
// 	try {
// 		const { data } = await http.get(`batch/batch-trainee/${id}/`);
// 		return {
// 			status: 200,
// 			data: data
// 		};
// 	} catch (error) {
// 		return Promise.resolve({
// 			status: 400,
// 			data: []
// 		});
// 	}
// }

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
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}
