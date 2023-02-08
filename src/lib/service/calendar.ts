import { http } from '$lib/service/auth';

export async function getCalenders(trainingCenter = null, year, month) {
	try {
		const { data } = await http.get('training-course/calender-course/', {
			params: {  training_center: trainingCenter, year, month }
		});
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
