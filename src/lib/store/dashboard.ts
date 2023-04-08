import { writable } from 'svelte/store';
import * as dashboardService from '../service/dashboard';

function createDashboardParticipantAndResourceStore() {
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

function createDashboardOrganizationstore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getParticipantsFromOrganization(year, start_month = null, end_month = null) {
		setLoading();
		const resp = await dashboardService.getParticipantsFromOrganization(
			year,
			start_month,
			end_month
		);
		set({ loading: false, data: resp.data.top_five_organizations });
	}

	return {
		subscribe,
		getParticipantsFromOrganization
	};
}

function createDashboardTrainingStatusStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainingStatus(year, start_month = null, end_month = null) {
		setLoading();
		const resp = await dashboardService.getTraininjgStatus(year, start_month, end_month);
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getTrainingStatus
	};
}

function createDashboardGenderWiseTrainingStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getGenderWiseTraining(year, start_month = null, end_month = null) {
		setLoading();
		const resp = await dashboardService.getGenderWiseTraining(year, start_month, end_month);
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getGenderWiseTraining
	};
}

function createDashboardPlannedBatchStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getPlannedBatch(year, start_month = null, end_month = null) {
		setLoading();
		const resp = await dashboardService.getPlannedBatch(year, start_month, end_month);
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getPlannedBatch
	};
}

function createDashboardCategoryParticipantsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getParticipantFromCategories(year, start_month = null, end_month = null) {
		setLoading();
		const resp = await dashboardService.getParticipantFromCategories(year, start_month, end_month);
		set({ loading: false, data: resp.data.top_four_course_category_name });
	}

	return {
		subscribe,
		getParticipantFromCategories
	};
}

function createDashboardSpeceficCategoriesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getSpeceficCategories() {
		setLoading();
		const resp = await dashboardService.getSpeceficCategories();
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getSpeceficCategories
	};
}

function createDashboardSpeceficCategoryDataStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });

	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getSpeceficCategoryData(id) {
		setLoading();
		const resp = await dashboardService.getSpeceficCategoryData(id);
		set({ loading: false, data: resp.data });
	}

	return {
		subscribe,
		getSpeceficCategoryData
	};
}

export const dashboardParticipantAndResource = createDashboardParticipantAndResourceStore();
export const dashboardOrganization = createDashboardOrganizationstore();
export const dashboardTrainingStatus = createDashboardTrainingStatusStore();
export const dashboardGenderWiseTraining = createDashboardGenderWiseTrainingStore();
export const dashboardPlannedBatch = createDashboardPlannedBatchStore();
export const dashboardCategoryParticipant = createDashboardCategoryParticipantsStore();
export const dashboardSpeceficCategories = createDashboardSpeceficCategoriesStore();
export const dashboardSpeceficCategoryData = createDashboardSpeceficCategoryDataStore();
