import { http } from '$lib/service/auth';

export async function getEvents() {
	try {
		const { data } = await http.get('event/events/');
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
export async function getEvent(id) {
	try {
		const { data } = await http.get(`event/events/${id}/`);
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
		return http.delete(`event/events/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEvent(payload) {
	try {
		const { data } = await http.put(`event/events/${payload.id}/`, payload);
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
		const { data } = await http.post(`event/events/`, payload);
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
