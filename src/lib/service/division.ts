import { http } from '$lib/service/auth';

export async function getDivisions() {
	try {
		const { data } = await http.get('location/division/');

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

export async function getDivision(id) {
	try {
		const { data } = await http.get(`location/division/${id}/`);
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

export async function deleteDivision(id: number) {
	try {
		return http.delete(`location/division/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateDivision(payload) {
	try {
		const { data } = await http.put(`location/division/${payload.id}/`, payload);
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

export async function createDivision(payload) {
	try {
		const { data } = await http.post(`location/division/`, payload);
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
