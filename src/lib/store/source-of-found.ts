import { writable } from 'svelte/store';
import * as sourceOfFoundService from '../service/source-of-found';

function createSourceOfFoundsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getSourceOfFounds() {
		setLoading();
		const resp = await sourceOfFoundService.getSourceOfFunds();
		set({ loading: false, data: resp.data });
	}

	async function deleteSourceOfFund(id: number) {
		setLoading();
		await sourceOfFoundService.deleteSourceOfFund(id);
		await getSourceOfFounds();
	}

	async function updateSourceOfFund(payload) {
		setLoading();
		await sourceOfFoundService.updateSourceOfFund(payload);
		await getSourceOfFounds();
	}
	async function createSourceOfFund(payload) {
		setLoading();
		await sourceOfFoundService.createSourceOfFund(payload);
		await getSourceOfFounds();
	}

	return {
		subscribe,
		getSourceOfFounds,
		deleteSourceOfFund,
		updateSourceOfFund,
		createSourceOfFund
	};
}

export const sourceOfFounds = createSourceOfFoundsStore();
