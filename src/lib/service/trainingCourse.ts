import { http } from '$lib/service/auth';

export async function getTrainingCourses(courseCategory = null) {
	try {
		const { data } = await http.get('training-course/', {
			params: {
				course_category: courseCategory
			}
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

export async function updateTrainingCourse(payload) {
	try {
		const { data } = await http.put(`training-course/${payload.id}/`, payload);
		return {
			status: 200,
			data,
			errorMessageForCode: null,
			errorMessageForTitle: null
		};
	} catch (err) {
		return Promise.resolve({
			status: 403,
			errorMessageForCode: err.response.data.code,
			errorMessageForTitle: err.response.data.title
		});
	}
}

export async function createTrainingCourse(payload) {
	try {
		const { data } = await http.post(`training-course/`, payload);
		return {
			status: 200,
			data,
			errorMessageForCode: null,
			errorMessageForTitle: null
		};
	} catch (err) {
		console.log(err);
		return Promise.resolve({
			status: 403,
			errorMessageForCode: err.response.data.code,
			errorMessageForTitle: err.response.data.title
		});
	}
}

export async function deleteTrainingCourse(id: number) {
	try {
		return http.delete(`training-course/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
