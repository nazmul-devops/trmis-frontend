import { writable } from 'svelte/store';
import * as divisionService from '../service/division';

function createDivisionsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getDivisions() {
		setLoading();
		const resp = await divisionService.getDivisions();
		set({ loading: false, data: resp.data });
	}

	async function deleteDivision(id: number) {
		setLoading();
		await divisionService.deleteDivision(id);
		await getDivisions();
	}

	async function updateDivision(divisions) {
		setLoading();
		await divisionService.updateDivision(divisions);
		await getDivisions();
	}
	async function createDivision(divisions) {
		setLoading();
		await divisionService.createDivision(divisions);
		await getDivisions();
	}

	return {
		subscribe,
		getDivisions,
		deleteDivision,
		updateDivision,
		createDivision
	};
}

export const divisions = createDivisionsStore();
