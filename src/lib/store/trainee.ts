import { writable } from 'svelte/store';
import * as traineeService from '$lib/service/trainee';

function createTraineesStore() {
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

	async function getTrainees() {
		setLoading();
		const resp = await traineeService.getTrainees();

		update((prev) => {
			prev.loading = false;
			prev.data = resp.data;
			return prev;
		});
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

	async function uploadExel(payload) {
		setLoading();

		const { errorMessage, errorRows, status, successRows } = await traineeService.uploadExel(
			payload
		);

		update((prev) => {
			prev.upload.errorMessage = errorMessage;
			prev.upload.errorRows = errorRows;
			prev.upload.status = status;
			prev.upload.successRows = successRows;
			return prev;
		});

		await getTrainees();
	}

	return {
		subscribe,
		getTrainees,
		deleteTrainee,
		updateTrainee,
		createTrainee,
		uploadExel
	};
}

export const trainees = createTraineesStore();
