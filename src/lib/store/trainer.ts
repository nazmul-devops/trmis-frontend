import { writable } from 'svelte/store';
import * as trainerService from '../service/service';

function createTrainerStore() {
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

	return {
		subscribe,
		getTrainers
	};
}

export const trainers = createTrainerStore();
