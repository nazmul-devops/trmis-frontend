import { writable } from 'svelte/store';
import * as traineeService from '$lib/service/trainee';

function createTraineesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainees() {
		setLoading();
		const resp = await traineeService.getTrainees();
		set({ loading: false, data: resp.data });
	}

	async function deleteTrainee(id: number) {
		setLoading();
		await traineeService.deleteTrainee(id);
		await getTrainees();
	}

	async function updateTrainee(trainees) {
		setLoading();
		await traineeService.updateTrainee(trainees);
		await getTrainees();
	}
	async function createTrainee(trainees) {
		setLoading();
		await traineeService.createTrainee(trainees);
		await getTrainees();
	}

	return {
		subscribe,
		getTrainees,
		deleteTrainee,
		updateTrainee,
		createTrainee
	};
}

export const trainees = createTraineesStore();
