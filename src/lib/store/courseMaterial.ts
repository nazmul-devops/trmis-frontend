import { writable, get } from 'svelte/store';
import * as CourseMaterialsService from '../service/courseMaterial';

function createCourseMaterialsStore() {
	const material = writable({ loading: true, data: [], trainingCourseId: null });
	function setLoading() {
		material.update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCourseMaterials(trainingCourse) {
		setLoading();
		const resp = await CourseMaterialsService.getCourseMaterials(trainingCourse);
		material.set({ loading: false, data: resp.data, trainingCourseId: trainingCourse });
	}

	async function deleteCourseMaterial(id: number) {
		setLoading();
		await CourseMaterialsService.deleteCourseMaterial(id);
		await getCourseMaterials(get(material).trainingCourseId);
	}

	async function updateCourseMaterial(courseCategory) {
		setLoading();
		await CourseMaterialsService.updateCourseMaterial(courseCategory);
		await getCourseMaterials(get(material).trainingCourseId);
	}
	async function createCourseMaterial(courseCategory) {
		setLoading();
		await CourseMaterialsService.createCourseMaterial(courseCategory);
		await getCourseMaterials(get(material).trainingCourseId);
	}

	return {
		subscribe: material.subscribe,
		getCourseMaterials,
		deleteCourseMaterial,
		updateCourseMaterial,
		createCourseMaterial
	};
}

export const courseMaterials = createCourseMaterialsStore();
