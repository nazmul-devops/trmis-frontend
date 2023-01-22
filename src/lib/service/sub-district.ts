import { http } from '$lib/service/auth';

export async function getSubDistricts() {
	try {
		const { data } = await http.get('location/sub-district/');

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

export async function getSubDistrict(id) {
	try {
		const { data } = await http.get(`location/sub-district/${id}/`);
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

export async function deleteSubDistrict(id: number) {
	try {
		return http.delete(`location/sub-district/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateSubDistrict(payload) {
	try {
		const { data } = await http.put(`location/sub-district/${payload.id}/`, payload);
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

export async function createSubDistrict(payload) {
	try {
		const { data } = await http.post(`location/sub-district/`, payload);
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
