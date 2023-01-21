import { get, writable } from 'svelte/store';
import * as subDistrictService from '../service/sub-district';

function createSubDistrictsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getSubDistricts() {
		setLoading();
		const resp = await subDistrictService.getSubDistricts();
		set({ loading: false, data: resp.data });
	}

	async function deleteSubDistrict(id: number) {
		setLoading();
		await subDistrictService.deleteSubDistrict(id);
		await getSubDistricts();
	}

	async function updateSubDistrict(subDistricts) {
		setLoading();
		await subDistrictService.updateSubDistrict(subDistricts);
		await getSubDistricts();
	}
	async function createSubDistrict(subDistricts) {
		setLoading();
		await subDistrictService.createSubDistrict(subDistricts);
		await getSubDistricts();
	}

	return {
		subscribe,
		getSubDistricts,
		deleteSubDistrict,
		updateSubDistrict,
		createSubDistrict
	};
}

export const subDistricts = createSubDistrictsStore();
