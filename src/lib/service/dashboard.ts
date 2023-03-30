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

export async function getParticipantsFromOrganization() {
	try {
		const { data } = await http.get(
			'dashboard/top-organizations/?year=2023&start_month=1&end_month=4'
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

export async function getTraininjgStatus() {
	try {
		const { data } = await http.get(
			'dashboard/training-course-status/?year=2023&start_month=1&end_month=4'
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
export async function getGenderWiseTraining() {
	try {
		const { data } = await http.get(
			'dashboard/gender-wise-training/?year=2023&start_month=1&end_month=4'
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
export async function getPlannedBatch() {
	try {
		const { data } = await http.get(
			'dashboard/planned-completed-batch/?year=2023&start_month=1&end_month=4'
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

export async function getParticipantFromCategories() {
	try {
		const { data } = await http.get(
			'dashboard/number-of-participant-for-different-training-course-category/'
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
