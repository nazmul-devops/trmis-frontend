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
		const { data } = await http.get('dashboard/top-four-organization/');
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
		const { data } = await http.get('dashboard/training-course-status/');
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
		const { data } = await http.get('dashboard/gender-wise-training/');
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
		const { data } = await http.get('dashboard/planned-batch/');
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
