import { writable } from 'svelte/store';
import * as usersService from '../service/users';

function createUsersStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getUsers() {
		setLoading();
		const resp = await usersService.getUsers();
		set({ loading: false, data: resp.data });
	}

	async function deleteUser(id: number) {
		setLoading();
		await usersService.deleteUser(id);
		await getUsers();
	}

	async function updateUser(users) {
		setLoading();
		await usersService.updateUser(users);
		await getUsers();
	}
	async function createUser(users) {
		setLoading();
		await usersService.createUser(users);
		await getUsers();
	}

	return {
		subscribe,
		getUsers,
		deleteUser,
		updateUser,
		createUser
	};
}

export const users = createUsersStore();
