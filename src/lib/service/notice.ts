import { http } from '$lib/service/auth';
import { generateFromData } from '$lib/service/utilities';

export async function getNotices() {
	try {
		const { data } = await http.get('notice/');
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

export async function getNotice(id) {
	try {
		const { data } = await http.get(`notice/${id}/`);
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

export async function deleteNotice(id: number) {
	try {
		return http.delete(`notice/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateNotice(payload) {
	const formData = await generateFromData(payload);
	try {
		const { data } = await http({
			method: 'PUT',
			url: `notice/${payload.id}/`,
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

export async function createNotice(payload) {
	try {
		const formData = await generateFromData(payload);

		const { data } = await http({
			method: 'POST',
			url: 'notice/',
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
