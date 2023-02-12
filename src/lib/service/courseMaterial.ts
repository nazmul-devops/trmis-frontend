import { http } from '$lib/service/auth';
import { generateFromData } from '$lib/service/utilities';
import axios from 'axios';

export async function getCourseMaterials() {
	try {
		const { data } = await http.get('training-course/course-material/');
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
		const { data } = await http.get(`training-course/course-material/${id}/`);
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
	const formData = await generateFromData(payload);
	try {
		const { data } = await http({
			method: 'PUT',
			url: `training-course/course-material/${payload.id}/`,
			data: formData,
			headers: { 'Content-Type': 'multipart/form-data' }
		});
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
		const formData = await generateFromData(payload);

		const { data } = await http({
			method: 'POST',
			url: 'training-course/course-material/',
			data: formData,
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		console.log(data);
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
		return http.delete(`training-course/course-material/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
