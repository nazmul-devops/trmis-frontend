import { writable } from 'svelte/store';
import * as batchSessionsService from '../service/batch-sessions-detail';

function createBatchSessionStore() {
	const { subscribe, update } = writable({
		loading: true,
		data: [],
		errorData: { status: null, errorMessage: null }
	});

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getBatchSessions(id: number) {
		setLoading();
		const resp = await batchSessionsService.getBatchSessions(id);

		update((prev) => {
			prev.loading = false;
			prev.data = resp.data;
			return prev;
		});
	}

	async function deleteBatchSession(batchId: number, sessionId: number) {
		setLoading();
		await batchSessionsService.deleteBatchSession(batchId, sessionId);
		await getBatchSessions(batchId);
	}

	async function updateBatchSession(batchId: number, payload) {
		setLoading();
		await batchSessionsService.updateBatchSession(batchId, payload);
		await getBatchSessions(batchId);
	}

	async function createBatchSession(batchId: number, payload) {
		setLoading();
		const { errorMessage, status } = await batchSessionsService.createBatchSession(
			batchId,
			payload
		);
		update((prev) => {
			prev.errorData.errorMessage = errorMessage;
			prev.errorData.status = status;
			return prev;
		});
		await getBatchSessions(batchId);
	}

	return {
		subscribe,
		getBatchSessions,
		deleteBatchSession,
		updateBatchSession,
		createBatchSession
	};
}

export const batchSession = createBatchSessionStore();
