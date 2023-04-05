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
		participantFromCategory: [],
		speceficCategories: []
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
	async function getParticipantsFromOrganization(year, start_month = null, end_month = null) {
		const resp = await dashboardService.getParticipantsFromOrganization(
			year,
			start_month,
			end_month
		);
		update((prev) => {
			prev.participantFromOrganization = resp.data.top_five_organizations;
			prev.loading = false;
			return prev;
		});
	}

	async function getTrainingStatus(year, start_month = null, end_month = null) {
		const resp = await dashboardService.getTraininjgStatus(year, start_month, end_month);
		update((prev) => {
			prev.trainingStatus = resp.data;
			prev.loading = false;
			return prev;
		});
	}

	async function getGenderWiseTraining(year, start_month = null, end_month = null) {
		const resp = await dashboardService.getGenderWiseTraining(year, start_month, end_month);
		update((prev) => {
			prev.genderWiseTraining = resp.data;
			prev.loading = false;
			return prev;
		});
	}
	async function getPlannedBatch(year, start_month = null, end_month = null) {
		const resp = await dashboardService.getPlannedBatch(year, start_month, end_month);
		update((prev) => {
			prev.planedBatch = resp.data;
			prev.loading = false;
			return prev;
		});
	}

	async function getParticipantFromCategories(year, start_month = null, end_month = null) {
		const resp = await dashboardService.getParticipantFromCategories(year, start_month, end_month);
		update((prev) => {
			prev.participantFromCategory = resp.data.top_four_course_category_name;
			prev.loading = false;
			return prev;
		});
	}

	async function getSpeceficCategories() {
		const resp = await dashboardService.getSpeceficCategories();
		update((prev) => {
			prev.loading = false;
			prev.speceficCategories = resp.data.specific_training_course_category;
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
		getPlannedBatch,
		getSpeceficCategories
	};
}

export const dashboardData = dcreateDashboardStore();
