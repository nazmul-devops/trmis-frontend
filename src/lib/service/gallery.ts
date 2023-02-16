import { http } from '$lib/service/auth';
import { generateFromData } from '$lib/service/utilities';

export async function getImages() {
	try {
		const { data } = await http.get('gallery/');
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

export async function getImage(id) {
	try {
		const { data } = await http.get(`gallery/${id}/`);
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

export async function deleteImage(id: number) {
	try {
		return http.delete(`gallery/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function updateImage(payload) {
	const formData = await generateFromData(payload);
	try {
		const { data } = await http({
			method: 'PUT',
			url: `gallery/${payload.id}/`,
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

export async function createImage(payload) {
	try {
		const formData = await generateFromData(payload);

		const { data } = await http({
			method: 'POST',
			url: 'gallery/',
			data: formData,
			headers: { 'Content-Type': 'multipart/form-data' }
		});
		console.log(data);
		return {
			status: 200,
			data
		};
	} catch (err) {
		console.log(err);
		return Promise.resolve({
			status: 403
		});
	}
}
