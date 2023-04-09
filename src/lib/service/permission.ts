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

export async function getPermissionsByUser() {
	console.log('getPermissionsByUser');
	try {
		const { data } = await http.get('user-permission/');

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
