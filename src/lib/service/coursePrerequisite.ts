import { http } from '$lib/service/auth';

export async function getCoursePrerequisites() {
	try {
		const { data } = await http.get('training-course/course-prerequisite/');
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
		const { data } = await http.get(`training-course/course-prerequisite/${id}/`);
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
		const { data } = await http.put(`training-course/course-prerequisite/${payload.id}/`, payload);
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
		const { data } = await http.post(`training-course/course-prerequisite/`, payload);
		console.log(data.prerequisite_courses);
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
		const { data } = await http.delete(`training-course/course-prerequisite/${id}/`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve();
	}
}
