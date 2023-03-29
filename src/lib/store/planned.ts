import { writable } from 'svelte/store';
import * as plannedBatchService from '../service/planned';

function createPlannedStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getPlannedBatches() {
		setLoading();
		const resp = await plannedBatchService.getPlannedBatchs();
		set({ loading: false, data: resp.data });
	}

	async function deletePlannedBatch(id: number) {
		setLoading();
		await plannedBatchService.deletePlannedBatch(id);
		await getPlannedBatches();
	}

	async function updatePlannedBatch(payload) {
		setLoading();
		await plannedBatchService.updatePlannedBatch(payload);
		await getPlannedBatches();
	}
	async function createPlannedBatch(payload) {
		setLoading();
		await plannedBatchService.createPlannedBatch(payload);
		await getPlannedBatches();
	}

	return {
		subscribe,
		getPlannedBatches,
		deletePlannedBatch,
		updatePlannedBatch,
		createPlannedBatch
	};
}

export const plannedBatches = createPlannedStore();
