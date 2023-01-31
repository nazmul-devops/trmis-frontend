import { http } from '$lib/service/auth';

export async function getContacts() {
	try {
		const { data } = await http.get('contact/');
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

export async function createContact(payload) {
	try {
		const { data } = await http.post(`contact/`, payload);
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

export async function deleteContact(id: number) {
	try {
		return http.delete(`contact/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}
