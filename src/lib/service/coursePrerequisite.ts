import { http } from '$lib/service/auth';

export async function getCoursePrerequisites() {
	try {
		const { data } = await http.get('training_course/course-prerequisite/');
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

export async function getCoursePrerequisite(id) {
	try {
		const { data } = await http.get(`training_course/course-prerequisite/${id}/`);
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

export async function updateCoursePrerequisite(payload) {
	try {
		const { data } = await http.put(`training_course/course-prerequisite/${payload.id}`, payload);
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

export async function createCoursePrerequisite(payload) {
	try {
		const { data } = await http.post(`training_course/course-prerequisite/`, payload);
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

export async function deleteCoursePrerequisite(id) {
	try {
		const { data } = await http.delete(`training_course/course-prerequisite/${id}`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve();
	}
}
