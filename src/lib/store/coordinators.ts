import { writable } from 'svelte/store';
import * as trainingCoordinatorsService from '../service/coordinators';

function createCoordinatorsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCoordinators() {
		setLoading();
		const resp = await trainingCoordinatorsService.getCoordinators();
		set({ loading: false, data: resp.data });
	}

	async function deleteCoordinator(id: number) {
		setLoading();
		await trainingCoordinatorsService.deleteCoordinator(id);
		await getCoordinators();
	}

	async function updateCoordinator(coordinators) {
		setLoading();
		await trainingCoordinatorsService.updateCoordinator(coordinators);
		await getCoordinators();
	}
	async function createCoordinator(coordinators) {
		setLoading();
		await trainingCoordinatorsService.createCoordinator(coordinators);
		await getCoordinators();
	}

	return {
		subscribe,
		getCoordinators,
		deleteCoordinator,
		updateCoordinator,
		createCoordinator
	};
}

export const coordinators = createCoordinatorsStore();
