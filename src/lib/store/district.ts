import { writable } from 'svelte/store';
import * as districtService from '../service/district';

function createDistrictsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getDistricts() {
		setLoading();
		const resp = await districtService.getDistricts();
		set({ loading: false, data: resp.data });
	}

	async function deleteDistrict(id: number) {
		setLoading();
		await districtService.deleteDistrict(id);
		await getDistricts();
	}

	async function updateDistrict(districts) {
		setLoading();
		await districtService.updateDistrict(districts);
		await getDistricts();
	}
	async function createDistrict(districts) {
		setLoading();
		await districtService.createDistrict(districts);
		await getDistricts();
	}

	return {
		subscribe,
		getDistricts,
		deleteDistrict,
		updateDistrict,
		createDistrict
	};
}

export const districts = createDistrictsStore();
