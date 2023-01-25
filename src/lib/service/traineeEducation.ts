import { http } from '$lib/service/auth';

export async function getEducations() {
	try {
		const { data } = await http.get('trainee/education-detail/');

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
		const { data } = await http.get(`trainee/education-detail/${id}/`);
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
		return http.delete(`trainee/education-detail/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateEducation(payload) {
	try {
		const { data } = await http.put(`trainee/education-detail/${payload.id}/`, payload);
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
		const { data } = await http.post(`trainee/education-detail/`, payload);
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
