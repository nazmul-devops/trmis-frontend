import { writable } from 'svelte/store';
import * as educationService from '$lib/service/trainerEducation';

function createEducationsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getEducations() {
		setLoading();
		const resp = await educationService.getEducations();
		set({ loading: false, data: resp.data });
	}

	async function deleteEducation(id: number) {
		setLoading();
		await educationService.deleteEducation(id);
		await getEducations();
	}

	async function updateEducation(payload) {
		setLoading();
		await educationService.updateEducation(payload);
		await getEducations();
	}
	async function createEducation(trainees) {
		setLoading();
		await educationService.createEducation(trainees);
		await getEducations();
	}

	return {
		subscribe,
		getEducations,
		deleteEducation,
		updateEducation,
		createEducation
	};
}

export const educations = createEducationsStore();
