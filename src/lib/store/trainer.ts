import { writable } from 'svelte/store';
import * as trainerService from '$lib/service/trainer';

function createTrainersStore() {
	const { subscribe, update } = writable({
		loading: true,
		data: [],
		upload: { status: null, errorRows: [], errorMessage: null, successRows: null }
	});
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainers() {
		setLoading();
		const resp = await trainerService.getTrainers();
		update((prev) => {
			prev.loading = false;
			prev.data = resp.data;
			return prev;
		});
	}

	async function deleteTrainer(id: number) {
		setLoading();
		await trainerService.deleteTrainer(id);
		await getTrainers();
	}

	async function updateTrainer(payload) {
		setLoading();
		await trainerService.updateTrainer(payload);
		await getTrainers();
	}
	async function createTrainer(payload) {
		setLoading();
		await trainerService.createTrainer(payload);
		await getTrainers();
	}

	async function uploadExel(payload) {
		setLoading();

		const { errorMessage, errorRows, status, successRows } = await trainerService.uploadExel(
			payload
		);

		update((prev) => {
			prev.upload.errorMessage = errorMessage;
			prev.upload.errorRows = errorRows;
			prev.upload.status = status;
			prev.upload.successRows = successRows;
			return prev;
		});

		await getTrainers();
	}

	return {
		subscribe,
		getTrainers,
		deleteTrainer,
		updateTrainer,
		createTrainer,
		uploadExel
	};
}

export const trainers = createTrainersStore();
