import { writable } from 'svelte/store';
import * as batchParticipants from '../service/batch-participants';

function createBatchParticipantStore() {
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

	async function getBatchParticipants(id: number) {
		setLoading();
		const res = await batchParticipants.getBatchParticipants(id);
		update((prev) => {
			prev.loading = false;
			prev.data = res.data.map((item) => ({ ...item, id: `${item.batch}-${item.trainee}` }));
			return prev;
		});
	}

	async function deleteBatchParticipant(batchId: number, participantId: number) {
		setLoading();
		await batchParticipants.deleteBatchParticipant(batchId, participantId);
		await getBatchParticipants(batchId);
	}

	async function createBatchParticipant(batchId: number, payload) {
		setLoading();
		const { errorMessage, status } = await batchParticipants.createBatchParticipant(
			batchId,
			payload
		);

		update((prev) => {
			prev.errorData.errorMessage = errorMessage;
			prev.errorData.status = status;
			return prev;
		});

		await getBatchParticipants(batchId);
	}

	return {
		subscribe,
		getBatchParticipants,
		deleteBatchParticipant,
		createBatchParticipant
	};
}

export const batchParticipantsList = createBatchParticipantStore();
