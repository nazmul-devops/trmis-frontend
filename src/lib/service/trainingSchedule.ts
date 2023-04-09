import { http } from '$lib/service/auth';

export async function getTrainingSchedules() {
	try {
		const { data } = await http.get('training-course/training-schedule/');
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

export async function getTrainingSchedule(id) {
	try {
		const { data } = await http.get(`training-course/training-schedule/${id}/`);
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

export async function updateTrainingSchedule(payload) {
	try {
		const { data } = await http.put(`training-course/training-schedule/${payload.id}/`, payload);
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

export async function createTrainingSchedule(payload) {
	try {
		const { data } = await http.post(`training-course/training-schedule/`, payload);
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

export async function deleteTrainingSchedule(id: number) {
	try {
		return http.delete(`training-course/training-schedule/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function getApprovedSchedules() {
	try {
		const { data } = await http.get('training-course/training-schedule/title-combo/');
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
