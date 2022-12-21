import { writable } from 'svelte/store';
import * as trainingCordinatorsService from '../service/trainingCordinators';

function createCordinatorsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCordinators() {
		setLoading();
		const resp = await trainingCordinatorsService.getCordinators();
		set({ loading: false, data: resp.data });
	}

	async function deleteCordinator(id: number) {
		setLoading();
		await trainingCordinatorsService.deleteCordinator(id);
		await getCordinators();
	}

	async function updateCordinator(cordinators) {
		setLoading();
		await trainingCordinatorsService.updateCordinator(cordinators);
		await getCordinators();
	}
	async function createCordinator(cordinators) {
		setLoading();
		await trainingCordinatorsService.createCordinator(cordinators);
		await getCordinators();
	}

	return {
		subscribe,
		getCordinators,
		deleteCordinator,
		updateCordinator,
		createCordinator
	};
}

export const cordinators = createCordinatorsStore();
