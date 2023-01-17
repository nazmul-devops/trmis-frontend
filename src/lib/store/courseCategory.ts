import {  writable } from 'svelte/store';
import * as CourseCategoriesService from '../service/courseCategory';

function createCourseCategoriesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCourseCategories() {
		setLoading();
		const resp = await CourseCategoriesService.getCourseCategories();
		set({ loading: false, data: resp.data });
	}

	async function deleteCourseCategory(id: number) {
		setLoading();
		await CourseCategoriesService.deleteCourseCategory(id);
		await getCourseCategories();
	}

	async function updateCourseCategory(courseCategory) {
		setLoading();
		await CourseCategoriesService.updateCourseCategory(courseCategory);
		await getCourseCategories();
	}
	async function createCourseCategory(courseCategory) {
		setLoading();
		await CourseCategoriesService.createCourseCategory(courseCategory);
		await getCourseCategories();
	}

	return {
		subscribe,
		getCourseCategories,
		deleteCourseCategory,
		updateCourseCategory,
		createCourseCategory
	};
}

export const courseCategories = createCourseCategoriesStore();
