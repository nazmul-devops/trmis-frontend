import { writable } from 'svelte/store';
import * as trainingScheduleService from '../service/trainingSchedule';

function createTrainingSchedulesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainingSchedules() {
		setLoading();
		const resp = await trainingScheduleService.getTrainingSchedules();
		set({ loading: false, data: resp.data });
	}

	async function deleteTrainingSchedule(id: number) {
		setLoading();
		await trainingScheduleService.deleteTrainingSchedule(id);
		await getTrainingSchedules();
	}

	async function updateTrainingSchedule(payload) {
		setLoading();
		await trainingScheduleService.updateTrainingSchedule(payload);
		await getTrainingSchedules();
	}
	async function createTrainingSchedule(payload) {
		setLoading();
		await trainingScheduleService.createTrainingSchedule(payload);
		await getTrainingSchedules();
	}

	return {
		subscribe,
		getTrainingSchedules,
		deleteTrainingSchedule,
		updateTrainingSchedule,
		createTrainingSchedule
	};
}

export const trainingSchedules = createTrainingSchedulesStore();
