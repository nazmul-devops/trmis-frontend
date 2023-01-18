import { http } from '$lib/service/auth';

export async function getCourseTopics() {
	try {
		const { data } = await http.get('training_course/course_topic/');
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

export async function getCourseTopic(id) {
	try {
		const { data } = await http.get(`training_course/course_topic/${id}/`);
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

export async function updateCourseTopic(payload) {
	try {
		const { data } = await http.put(`training_course/course_topic/${payload.id}				`, payload);
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
		const { data } = await http.post(`training_course/course_topic/`, payload);
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
		const { data } = await http.delete(`training_course/course_topic/${id}`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve();
	}
}
