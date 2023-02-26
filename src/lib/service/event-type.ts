import { http } from '$lib/service/auth';

export async function getEventTypes() {
	try {
		const { data } = await http.get('event/type/');
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

export async function deleteEventType(id) {
	try {
		return http.delete(`event/type/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEventType(payload) {
	try {
		const { data } = await http.put(`event/type/${payload.id}/`, payload);
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

export async function createEventType(payload) {
	try {
		const { data } = await http.post(`event/type/`, payload);
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
