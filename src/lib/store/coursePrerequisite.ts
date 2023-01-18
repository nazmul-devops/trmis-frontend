import { writable } from 'svelte/store';
import * as CoursePrerequisitesService from '../service/coursePrerequisite';

function createCoursePrerequisitesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCoursePrerequisites() {
		setLoading();
		const resp = await CoursePrerequisitesService.getCoursePrerequisites();
		set({ loading: false, data: resp.data });
	}

	async function deleteCoursePrerequisite(id: number) {
		setLoading();
		await CoursePrerequisitesService.deleteCoursePrerequisite(id);
		await getCoursePrerequisites();
	}

	async function updateCoursePrerequisite(coursePrerequisite) {
		setLoading();
		await CoursePrerequisitesService.updateCoursePrerequisite(coursePrerequisite);
		await getCoursePrerequisites();
	}
	async function createCoursePrerequisite(coursePrerequisite) {
		setLoading();
		await CoursePrerequisitesService.createCoursePrerequisite(coursePrerequisite);
		await getCoursePrerequisites();
	}

	return {
		subscribe,
		getCoursePrerequisites,
		deleteCoursePrerequisite,
		updateCoursePrerequisite,
		createCoursePrerequisite
	};
}

export const coursePrerequisites = createCoursePrerequisitesStore();
