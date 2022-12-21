import { writable } from 'svelte/store';
import * as gradesService from '../service/grades';

function createGradesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getGrades() {
		setLoading();
		const resp = await gradesService.getGrades();
		set({ loading: false, data: resp.data });
	}

	async function deleteGrade(id: number) {
		setLoading();
		await gradesService.deleteGrade(id);
		await getGrades();
	}

	async function updateGrade(grades) {
		setLoading();
		await gradesService.updateGrade(grades);
		await getGrades();
	}
	async function createGrade(grades) {
		setLoading();
		await gradesService.createGrade(grades);
		await getGrades();
	}

	return {
		subscribe,
		getGrades,
		deleteGrade,
		updateGrade,
		createGrade
	};
}

export const grades = createGradesStore();
