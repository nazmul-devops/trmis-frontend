import { http } from '$lib/service/auth';

export async function getEventSchedules() {
	try {
		const { data } = await http.get('event/schedules/');
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
		return http.delete(`event/schedules/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEventSchedule(payload) {
	try {
		const { data } = await http.put(`event/schedules/${payload.id}/`, payload);
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
		const { data } = await http.post(`event/schedules/`, payload);
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
