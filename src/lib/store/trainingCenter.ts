import { writable } from 'svelte/store';
import * as trainingCenterService from '../service/trainingCenter';

function createTrainingCentersStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainingCenters() {
		setLoading();
		const resp = await trainingCenterService.getTrainingCenters();
		set({ loading: false, data: resp.data });
	}

	async function deleteTrainingCenter(id: number) {
		setLoading();
		await trainingCenterService.deleteTrainingCenter(id);
		await getTrainingCenters();
	}

	async function updateTrainingCenter(payload) {
		setLoading();
		await trainingCenterService.updateTrainingCenter(payload);
		await getTrainingCenters();
	}
	async function createTrainingCenter(payload) {
		setLoading();
		await trainingCenterService.createTrainingCenter(payload);
		await getTrainingCenters();
	}

	return {
		subscribe,
		getTrainingCenters,
		deleteTrainingCenter,
		updateTrainingCenter,
		createTrainingCenter
	};
}

export const trainingCenters = createTrainingCentersStore();
