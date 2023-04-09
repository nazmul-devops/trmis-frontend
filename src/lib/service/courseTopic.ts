import { http } from '$lib/service/auth';

export async function getCourseTopics(trainingCourse = null) {
	try {
		const { data } = await http.get('training-course/course-topic/', {
			params: { training_course: trainingCourse }
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

export async function updateCourseTopic(payload) {
	try {
		const { data } = await http.put(`training-course/course-topic/${payload.id}/`, payload);
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

export async function createCourseTopic(payload) {
	try {
		const { data } = await http.post(`training-course/course-topic/`, payload);
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

export async function deleteCourseTopic(id) {
	try {
		const { data } = await http.delete(`training-course/course-topic/${id}/`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve();
	}
}
