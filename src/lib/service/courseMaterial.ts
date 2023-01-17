import { http } from '$lib/service/auth';

export async function getCourseMaterials() {
	try {
		const { data } = await http.get('training_course/course_material');
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

export async function getCourseMaterial(id) {
	try {
		const { data } = await http.get(`training_course/course_material/${id}/`);
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

export async function updateCourseMaterial(payload) {
	try {
		const { data } = await http.put(`training_course/course_material/${payload.id}`, payload);
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

export async function createCourseMaterial(payload) {
	try {
		const { data } = await http.post(`training_course/course_material`, payload);
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

export async function deleteCourseMaterial(id: number) {
	try {
		return http.delete(`training_course/course_material/${id}`);
	} catch (err) {
		return Promise.resolve();
	}
}
