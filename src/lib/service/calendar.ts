import { http } from '$lib/service/auth';

export async function getCalenders(
	trainingCenter = null,
	division = null,
	district = null,
	subDistrict = null,
	year,
	month
) {
	try {
		const { data } = await http.get('training-course/calender-course/', {
			params: {
				training_center: trainingCenter,
				year,
				month,
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

export async function getEventCalenders(
	trainingCenter = null,
	division = null,
	district = null,
	subDistrict = null,
	year,
	month
) {
	try {
		const { data } = await http.get('event/calender/', {
			params: {
				training_center: trainingCenter,
				year,
				month,
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

