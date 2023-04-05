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

export async function getParticipantsFromOrganization(year, startMonth, endMonth) {
	try {
		const { data } = await http.get('dashboard/top-organizations/', {
			params: {
				year,
				start_month: startMonth,
				end_month: endMonth
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

export async function getTraininjgStatus(year, startMonth, endMonth) {
	try {
		const { data } = await http.get('dashboard/training-course-status/', {
			params: {
				year,
				start_month: startMonth,
				end_month: endMonth
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
export async function getGenderWiseTraining(year, startMonth, endMonth) {
	try {
		const { data } = await http.get('dashboard/gender-wise-training/', {
			params: {
				year,
				start_month: startMonth,
				end_month: endMonth
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
export async function getPlannedBatch(year, startMonth, endMonth) {
	try {
		const { data } = await http.get('dashboard/planned-completed-batch/', {
			params: {
				year,
				start_month: startMonth,
				end_month: endMonth
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

export async function getParticipantFromCategories(year, startMonth, endMonth) {
	try {
		const { data } = await http.get(
			'dashboard/number-of-participant-for-different-training-course-category/',
			{
				params: {
					year,
					start_month: startMonth,
					end_month: endMonth
				}
			}
		);
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

export async function getSpeceficCategories(selectedCourseCategory) {
	try {
		const { data } = await http.get('dashboard/specific-training-course-category/', {
			params: {
				selected_course_category: selectedCourseCategory
			}
		});
		return {
			status: 201,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}
