import { writable } from 'svelte/store';
import * as designationService from '../service/designations';

function createDesignationsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getDesignations() {
		setLoading();
		const resp = await designationService.getDesignations();
		set({ loading: false, data: resp.data });
	}

	async function deleteDesignation(id: number) {
		setLoading();
		await designationService.deleteDesignation(id);
		await getDesignations();
	}

	async function updateDesignation(designation) {
		setLoading();
		await designationService.updateDesignation(designation);
		await getDesignations();
	}
	async function createDesignation(designation) {
		setLoading();
		await designationService.createDesignation(designation);
		await getDesignations();
	}

	return {
		subscribe,
		getDesignations,
		deleteDesignation,
		updateDesignation,
		createDesignation
	};
}

export const designations = createDesignationsStore();
