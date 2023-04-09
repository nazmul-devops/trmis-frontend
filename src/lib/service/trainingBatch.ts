import { http } from '$lib/service/auth';

export async function getTrainingBatch(
	courseId,
	organization = null,
	year = null,
	division = null,
	district = null,
	subDistrict = null
) {
	try {
		const { data } = await http.get(`training-course/${courseId}/batch-data/`, {
			params: {
				organization,
				year,
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
