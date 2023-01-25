import { writable } from 'svelte/store';
import * as completedCourseService from '$lib/service/completedCourse';

function createCompletedCourseStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCompletedCourses() {
		setLoading();
		const resp = await completedCourseService.getCompletedCourses();
		set({ loading: false, data: resp.data });
	}

	async function deleteCompletedCourse(id: number) {
		setLoading();
		await completedCourseService.deleteCompletedCourse(id);
		await getCompletedCourses();
	}

	async function updateCompletedCourse(payload) {
		setLoading();
		await completedCourseService.updateCompletedCourse(payload);
		await getCompletedCourses();
	}
	async function createCompletedCourse(payload) {
		setLoading();
		await completedCourseService.createCompletedCourse(payload);
		await getCompletedCourses();
	}

	return {
		subscribe,
		getCompletedCourses,
		deleteCompletedCourse,
		updateCompletedCourse,
		createCompletedCourse
	};
}

export const completedCourses = createCompletedCourseStore();
