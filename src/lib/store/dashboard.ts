import { writable } from 'svelte/store';
import * as dashboardService from '../service/dashboard';

function dcreateDashboardStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getParticipantsAndResources() {
		setLoading();
		const resp = await dashboardService.getParticipantsAndResources();
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getParticipantsAndResources
	};
}

export const dashboardData = dcreateDashboardStore();
