import { http } from '$lib/service/auth';

export async function getTrainingBatch(
	courseId,
	trainingCenter = null,
	division = null,
	district = null,
	subDistrict = null
) {
	try {
		const { data } = await http.get(`training-course/${courseId}/batch-data/`, {
			params: {
				trainingCenter,
				division,
				district,
				sub_district: subDistrict
			}
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
