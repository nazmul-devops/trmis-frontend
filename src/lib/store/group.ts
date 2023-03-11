import { writable } from 'svelte/store';
import * as groupService from '../service/group';

function createGropusStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getGroups() {
		setLoading();
		const resp = await groupService.getGroups();
		set({ loading: false, data: resp.data });
	}

	async function deleteGroup(id: number) {
		setLoading();
		await groupService.deleteGroup(id);
		await getGroups();
	}

	async function updateGroup(payload) {
		setLoading();
		await groupService.updateGroup(payload);
		await getGroups();
	}
	async function createGroup(payload) {
		setLoading();
		await groupService.createGroup(payload);
		await getGroups();
	}

	return {
		subscribe,
		getGroups,
		deleteGroup,
		updateGroup,
		createGroup
	};
}

export const groups = createGropusStore();
