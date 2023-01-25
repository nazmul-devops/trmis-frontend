import { http } from '$lib/service/auth';

export async function getEducations() {
	try {
		const { data } = await http.get('trainer/education-detail/');

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

export async function getEducation(id) {
	try {
		const { data } = await http.get(`trainer/education-detail/${id}/`);
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

export async function deleteEducation(id: number) {
	try {
		return http.delete(`trainer/education-detail/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEducation(payload) {
	try {
		const { data } = await http.put(`trainer/education-detail/${payload.id}/`, payload);
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

export async function createEducation(payload) {
	try {
		const { data } = await http.post(`trainer/education-detail/`, payload);
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
