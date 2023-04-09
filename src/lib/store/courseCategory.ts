import { writable } from 'svelte/store';
import * as CourseCategoriesService from '../service/courseCategory';

function createCourseCategoriesStore() {
	const { subscribe, update } = writable({
		loading: true,
		data: [],
		errorData: { status: null, errorMessageForTitle: null }
	});
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCourseCategories() {
		setLoading();
		const resp = await CourseCategoriesService.getCourseCategories();
		update((prev) => {
			prev.loading = false;
			prev.data = resp.data;
			return prev;
		});
	}

	async function deleteCourseCategory(id: number) {
		setLoading();
		await CourseCategoriesService.deleteCourseCategory(id);
		await getCourseCategories();
	}

	async function updateCourseCategory(courseCategory) {
		setLoading();
		const { status, errorMessageForTitle } = await CourseCategoriesService.updateCourseCategory(
			courseCategory
		);
		update((prev) => {
			prev.errorData.status = status;
			prev.errorData.errorMessageForTitle = errorMessageForTitle;
			return prev;
		});
		await getCourseCategories();
	}
	async function createCourseCategory(courseCategory) {
		setLoading();
		const { status, errorMessageForTitle } = await CourseCategoriesService.createCourseCategory(
			courseCategory
		);
		update((prev) => {
			prev.errorData.status = status;
			prev.errorData.errorMessageForTitle = errorMessageForTitle;
			return prev;
		});
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
