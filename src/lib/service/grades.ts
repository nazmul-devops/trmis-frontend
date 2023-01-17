import { http } from '$lib/service/auth';

export async function getGrades() {
	try {
		const { data } = await http.get('settings/grades/');

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

export async function getGrade(id) {
	console.log(id);
	try {
		const { data } = await http.get(`settings/grades/${id}/`);
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

export async function deleteGrade(id: number) {
	try {
		return http.delete(`settings/grades/${id}`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateGrade(payload) {
	try {
		const { data } = await http.put(`settings/grades/${payload.id}`, payload);
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

export async function createGrade(payload) {
	try {
		const { data } = await http.post(`settings/grades/`, payload);
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
