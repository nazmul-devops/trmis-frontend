import { http } from '$lib/service/auth';

export async function getCourseCategories() {
	try {
		const { data } = await http.get('training-course/course-category/');
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

export async function getCourseCategory(id) {
	try {
		const { data } = await http.get(`training-course/course-category/${id}/`);
		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: null
		});
	}
}

export async function updateCourseCategory(payload) {
	try {
		const { data } = await http.put(`training-course/course-category/${payload.id}/`, payload);
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

export async function createCourseCategory(payload) {
	try {
		const { data } = await http.post(`training-course/course-category/`, payload);
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

export async function deleteCourseCategory(id: number) {
	try {
		return http.delete(`training-course/course-category/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
