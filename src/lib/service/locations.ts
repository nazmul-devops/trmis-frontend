import { http } from './auth';

export async function getLocations() {
	try {
		const { data } = await http.get('location/');
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
