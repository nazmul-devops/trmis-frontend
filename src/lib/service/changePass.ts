import { http } from '$lib/service/auth';

export async function changePass(payload) {
	try {
		const { data } = await http.put(`change-password/`, payload);
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
