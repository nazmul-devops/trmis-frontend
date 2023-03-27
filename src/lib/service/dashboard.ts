import { http } from '$lib/service/auth';

export async function getParticipantsAndResources() {
	try {
		const { data } = await http.get('dashboard/total-participant-resource-person/');
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
