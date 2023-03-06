import { writable } from 'svelte/store';
import * as locationsService from '../service/locations';

function createLocationsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getLocations() {
		setLoading();
		const resp = await locationsService.getLocations();
		set({ loading: false, data: resp.data });
	}


	return {
		subscribe,
		getLocations
	};
}

export const locations = createLocationsStore();
