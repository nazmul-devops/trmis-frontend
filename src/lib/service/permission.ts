import { http } from '$lib/service/auth';

export async function getPermissions() {
	try {
		const { data } = await http.get('permission-combo/');

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
