import { writable } from 'svelte/store';
import * as traineeRequestService from '$lib/service/trainee-request';

function createTraineeRequestStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainee_Requests() {
		setLoading();
		const resp = await traineeRequestService.getTrainee_Requests();
		set({ loading: false, data: resp.data });
	}

	// async function deleteTrainee(id: number) {
	// 	setLoading();
	// 	await traineeService.deleteTrainee(id);
	// 	await getTrainees();
	// }

	async function updateTrainee_Request(payload) {
		setLoading();
		await traineeRequestService.updateTrainee_Request(payload);
		await getTrainee_Requests();
	}

	async function createTrainee_Request(payload) {
		setLoading();
		await traineeRequestService.createTrainee_Request(payload);
		await getTrainee_Requests();
	}

	return {
		subscribe,
		getTrainee_Requests,
		// deleteTrainee,
		updateTrainee_Request,
		createTrainee_Request
	};
}

export const traineeRequests = createTraineeRequestStore();
