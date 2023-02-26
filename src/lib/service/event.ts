import { http } from '$lib/service/auth';

export async function getEvents() {
	try {
		const { data } = await http.get('event/');
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

export async function deleteEvent(id) {
	try {
		return http.delete(`event/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEvent(payload) {
	try {
		const { data } = await http.put(`event/${payload.id}/`, payload);
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

export async function createEvent(payload) {
	try {
		const { data } = await http.post(`event/`, payload);
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
