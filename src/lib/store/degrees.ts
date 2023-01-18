import { writable } from 'svelte/store';
import * as degreesService from '../service/degrees';

function createDegreesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getDegrees() {
		setLoading();
		const resp = await degreesService.getDegrees();
		set({ loading: false, data: resp.data });
	}

	async function deleteDegree(id: number) {
		setLoading();
		await degreesService.deleteDegree(id);
		await getDegrees();
	}

	async function updateDegree(degrees) {
		setLoading();
		await degreesService.updateDegree(degrees);
		await getDegrees();
	}
	async function createDegree(degrees) {
		setLoading();
		await degreesService.createDegree(degrees);
		await getDegrees();
	}

	return {
		subscribe,
		getDegrees,
		deleteDegree,
		updateDegree,
		createDegree
	};
}

export const degrees = createDegreesStore();
