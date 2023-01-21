import { http } from '$lib/service/auth';

export async function getSourceOfFunds() {
	try {
		const { data } = await http.get('settings/source-of-funds/');
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

export async function getSourceOfFund(id) {
	try {
		const { data } = await http.get(`settings/source-of-funds/${id}/`);
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

export async function updateSourceOfFund(payload) {
	try {
		const { data } = await http.put(`settings/source-of-funds/${payload.id}/`, payload);
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

export async function createSourceOfFund(payload) {
	try {
		const { data } = await http.post(`settings/source-of-funds/`, payload);
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

export async function deleteSourceOfFund(id: number) {
	try {
		return http.delete(`settings/source-of-funds/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
