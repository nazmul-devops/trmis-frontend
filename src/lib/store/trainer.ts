import { writable } from 'svelte/store';
import * as trainerService from '$lib/service/trainer';

function createTrainersStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainers() {
		setLoading();
		const resp = await trainerService.getTrainers();
		set({ loading: false, data: resp.data });
	}

	async function deleteTrainer(id: number) {
		setLoading();
		await trainerService.deleteTrainer(id);
		await getTrainers();
	}

	async function updateTrainer(payload) {
		setLoading();
		await trainerService.updateTrainer(payload);
		await getTrainers();
	}
	async function createTrainer(payload) {
		setLoading();
		await trainerService.createTrainer(payload);
		await getTrainers();
	}

	return {
		subscribe,
		getTrainers,
		deleteTrainer,
		updateTrainer,
		createTrainer
	};
}

export const trainers = createTrainersStore();
