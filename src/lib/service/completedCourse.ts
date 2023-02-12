import { http } from '$lib/service/auth';

export async function getCompletedCourses(traineeId) {
	try {
		const { data } = await http.get('trainee/completed-course/', {
			params: { trainee_id: traineeId }
		});

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

export async function getCompletedCourse(id) {
	try {
		const { data } = await http.get(`trainee/completed-course/${id}/`);
		return {
			status: 200,
			data: data
		};
	} catch (error) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}

export async function deleteCompletedCourse(id: number) {
	try {
		return http.delete(`trainee/completed-course/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateCompletedCourse(payload) {
	try {
		const { data } = await http.put(`trainee/completed-course/${payload.id}/`, payload);
		return {
			status: 204,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 403
		});
	}
}

export async function createCompletedCourse(payload) {
	try {
		const { data } = await http.post(`trainee/completed-course/`, payload);
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
