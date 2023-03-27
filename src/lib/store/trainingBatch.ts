import { writable } from 'svelte/store';
import * as completedTrainingBatchService from '$lib/service/trainingBatch';

function createTrainingBatchStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTarainingBatch(courseId) {
		setLoading();
		const resp = await completedTrainingBatchService.getTrainingBatch(courseId);
		set({
			loading: false,
			data: resp.data
		});
	}

	return {
		subscribe,
		getTarainingBatch
	};
}

export const trainingBatches = createTrainingBatchStore();
