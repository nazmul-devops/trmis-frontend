import { writable } from 'svelte/store';
import * as batchServieces from '../service/batch';

function createBatchStore() {
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

	async function getBatches() {
		setLoading();
		const resp = await batchServieces.getBatches();
		update((prev) => {
			prev.loading = false;
			prev.data = resp.data;
			return prev;
		});
	}

	async function deleteBatch(id: number) {
		setLoading();
		await batchServieces.deleteBatch(id);
		getBatches();
	}

	async function updateBatch(payload) {
		setLoading();
		await batchServieces.updateBatch(payload);
		getBatches();
	}

	async function createBatch(payload) {
		setLoading();
		await batchServieces.createBatch(payload);
		getBatches();
	}

	async function uploadExel(payload, id) {
		setLoading();

		const { errorMessage, errorRows, status, successRows } = await batchServieces.uploadExel(
			payload, id
		);

		update((prev) => {
			prev.upload.errorMessage = errorMessage;
			prev.upload.errorRows = errorRows;
			prev.upload.status = status;
			prev.upload.successRows = successRows;
			return prev;
		});

		await getBatches();
	}

	return {
		subscribe,
		getBatches,
		deleteBatch,
		updateBatch,
		createBatch,
		uploadExel
	};
}

export const batchs = createBatchStore();
