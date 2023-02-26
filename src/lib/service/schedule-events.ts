import { http } from '$lib/service/auth';

export async function getEventSchedules() {
	try {
		const { data } = await http.get('event/schedule/');
		return {
			status: 200,
			data
			// : data.map((item) => ({ ...item, id: item.trainer }))
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

export async function deleteEventSchedule(id) {
	try {
		return http.delete(`event/schedule/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEventSchedule(payload) {
	try {
		const { data } = await http.put(`event/schedule/${payload.id}/`, payload);
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

export async function createEventSchedule(payload) {
	try {
		const { data } = await http.post(`event/schedule/`, payload);
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
