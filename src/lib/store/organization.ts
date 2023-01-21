import { writable } from 'svelte/store';
import * as organizationService from '../service/organization';

function createOrganizationsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getOrganizations() {
		setLoading();
		const resp = await organizationService.getOrganizations();
		set({ loading: false, data: resp.data });
	}

	async function deleteOrganization(id: number) {
		setLoading();
		await organizationService.deleteOrganization(id);
		await getOrganizations();
	}

	async function updateOrganization(payload) {
		setLoading();
		await organizationService.updateOrganization(payload);
		await getOrganizations();
	}
	async function createOrganization(payload) {
		setLoading();
		await organizationService.createOrganization(payload);
		await getOrganizations();
	}

	return {
		subscribe,
		getOrganizations,
		deleteOrganization,
		updateOrganization,
		createOrganization
	};
}

export const organizations = createOrganizationsStore();
