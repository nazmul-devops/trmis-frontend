import { derived, get, writable } from 'svelte/store';
import * as permissionService from '../service/permission';
import { groupsList } from '$lib/store/group';

function createPermissionsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getPermissions() {
		setLoading();
		const resp = await permissionService.getPermissions();
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getPermissions
	};
}

export const permissions = createPermissionsStore();

function createUserPermissionStore() {
	const { subscribe, set } = writable([]);

	async function getPermissionsByUser() {
		const resp = await permissionService.getPermissionsByUser();
		set(resp.data);
	}

	return {
		subscribe,
		getPermissionsByUser
	};
}

export const permissionsByGroups = createUserPermissionStore();
