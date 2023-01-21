import { writable } from 'svelte/store';
import * as collaborationService from '../service/collaboration';

function createCollaborationsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCollaborations() {
		setLoading();
		const resp = await collaborationService.getCollaborations();
		set({ loading: false, data: resp.data });
	}

	async function deleteCollaboration(id: number) {
		setLoading();
		await collaborationService.deleteCollaboration(id);
		await getCollaborations();
	}

	async function updateCollaboration(payload) {
		setLoading();
		await collaborationService.updateCollaboration(payload);
		await getCollaborations();
	}
	async function createCollaboration(payload) {
		setLoading();
		await collaborationService.createCollaboration(payload);
		await getCollaborations();
	}

	return {
		subscribe,
		getCollaborations,
		deleteCollaboration,
		updateCollaboration,
		createCollaboration
	};
}

export const collaborations = createCollaborationsStore();
