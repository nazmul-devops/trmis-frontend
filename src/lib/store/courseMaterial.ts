import { writable } from 'svelte/store';
import * as CourseMaterialsService from '../service/courseMaterial';

function createCourseMaterialsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCourseMaterials() {
		setLoading();
		const resp = await CourseMaterialsService.getCourseMaterials();
		set({ loading: false, data: resp.data });
	}

	async function deleteCourseMaterial(id: number) {
		setLoading();
		await CourseMaterialsService.deleteCourseMaterial(id);
		await getCourseMaterials();
	}

	async function updateCourseMaterial(courseCategory) {
		setLoading();
		await CourseMaterialsService.updateCourseMaterial(courseCategory);
		await getCourseMaterials();
	}
	async function createCourseMaterial(courseCategory) {
		setLoading();
		await CourseMaterialsService.createCourseMaterial(courseCategory);
		await getCourseMaterials();
	}

	return {
		subscribe,
		getCourseMaterials,
		deleteCourseMaterial,
		updateCourseMaterial,
		createCourseMaterial
	};
}

export const courseMaterials = createCourseMaterialsStore();
