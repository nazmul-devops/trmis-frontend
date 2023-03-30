import { writable } from 'svelte/store';
import * as dashboardService from '../service/dashboard';

function dcreateDashboardStore() {
	const { subscribe, update } = writable({
		loading: true,
		participantAndResource: [],
		participantFromOrganization: [],
		trainingStatus: [],
		genderWiseTraining: [],
		planedBatch: [],
		participantFromCategory: []
	});
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getParticipantsAndResources() {
		setLoading();
		const resp = await dashboardService.getParticipantsAndResources();
		update((prev) => {
			prev.participantAndResource = resp.data;
			prev.loading = false;
			return prev;
		});
	}
	async function getParticipantsFromOrganization() {
		const resp = await dashboardService.getParticipantsFromOrganization();
		update((prev) => {
			prev.participantFromOrganization = resp.data.top_five_organizations;
			prev.loading = false;
			return prev;
		});
	}

	async function getTrainingStatus() {
		const resp = await dashboardService.getTraininjgStatus();
		update((prev) => {
			prev.trainingStatus = resp.data;
			prev.loading = false;
			return prev;
		});
	}

	async function getGenderWiseTraining() {
		const resp = await dashboardService.getGenderWiseTraining();
		update((prev) => {
			prev.genderWiseTraining = resp.data;
			prev.loading = false;
			return prev;
		});
	}
	async function getPlannedBatch() {
		const resp = await dashboardService.getPlannedBatch();
		update((prev) => {
			prev.planedBatch = resp.data;
			prev.loading = false;
			return prev;
		});
	}

	async function getParticipantFromCategories() {
		const resp = await dashboardService.getParticipantFromCategories();
		update((prev) => {
			prev.participantFromCategory = resp.data;
			prev.loading = false;
			return prev;
		});
	}

	return {
		subscribe,
		getParticipantsAndResources,
		getParticipantsFromOrganization,
		getTrainingStatus,
		getGenderWiseTraining,
		getParticipantFromCategories,
		getPlannedBatch
	};
}

export const dashboardData = dcreateDashboardStore();
