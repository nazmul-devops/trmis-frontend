import { http } from '$lib/service/auth';

export async function getProfileInfo() {
	try {
		const { data } = await http.get('profile');
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

export async function updateProfile(payload) {
	try {
		const { data } = await http.put(`profile`, payload);
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
