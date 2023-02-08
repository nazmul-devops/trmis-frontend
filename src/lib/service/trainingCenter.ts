import { http } from '$lib/service/auth';

export async function getTrainingCenters() {
	try {
		const { data } = await http.get('training-center/');
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

export async function getTrainingCenter(id) {
	try {
		const { data } = await http.get(`training-center/${id}/`);
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

export async function updateTrainingCenter(payload) {
	try {
		const { data } = await http.put(`training-center/${payload.id}/`, payload);
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

export async function createTrainingCenter(payload) {
	try {
		const { data } = await http.post(`training-center/`, payload);
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

export async function deleteTrainingCenter(id: number) {
	try {
		return http.delete(`training-center/${id}/`);
	} catch (err) {
		return Promise.resolve();
	}
}

export async function getTrainingCentersTitles() {
	try {
		const { data } = await http.get('training-center/title-combo/');
		console.log(data);
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


