import { http } from '$lib/service/auth';

export async function getDistricts() {
	try {
		const { data } = await http.get('location/district/');

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

export async function getDistrict(id) {
	try {
		const { data } = await http.get(`location/district/${id}/`);
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

export async function deleteDistrict(id: number) {
	try {
		return http.delete(`location/district/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateDistrict(payload) {
	try {
		const { data } = await http.put(`location/district/${payload.id}/`, payload);
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

export async function createDistrict(payload) {
	try {
		const { data } = await http.post(`location/district/`, payload);
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
