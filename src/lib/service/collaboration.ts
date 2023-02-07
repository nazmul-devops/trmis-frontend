import { http } from '$lib/service/auth';

export async function getCollaborations() {
	try {
		const { data } = await http.get('settings/collaboration/');
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

export async function getCollaboration(id) {
	try {
		const { data } = await http.get(`settings/collaboration/${id}/`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400
		});
	}
}

export async function updateCollaboration(payload) {
	try {
		const { data } = await http.patch(`settings/collaboration/${payload.id}/`, payload);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}

export async function createCollaboration(payload) {
	try {
		const { data } = await http.post(`settings/collaboration/`, payload);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}

export async function deleteCollaboration(id: number) {
	try {
		return http.delete(`settings/collaboration/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
