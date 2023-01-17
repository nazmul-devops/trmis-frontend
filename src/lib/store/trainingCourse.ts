import { writable } from 'svelte/store';
import * as trainingCoursesService from '../service/trainingCourse';

function createTrainingCoursesStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainingCourses() {
		setLoading();
		const resp = await trainingCoursesService.getTrainingCourses();
		set({ loading: false, data: resp.data });
	}

	async function deleteTrainingCourse(id: number) {
		setLoading();
		await trainingCoursesService.deleteTrainingCourse(id);
		await getTrainingCourses();
	}

	async function updateTrainingCourse(trainigCourse) {
		setLoading();
		await trainingCoursesService.updateTrainingCourse(trainigCourse);
		await getTrainingCourses();
	}
	async function createTrainingCourse(trainigCourse) {
		setLoading();
		await trainingCoursesService.createTrainingCourse(trainigCourse);
		await getTrainingCourses();
	}

	return {
		subscribe,
		getTrainingCourses,
		deleteTrainingCourse,
		updateTrainingCourse,
		createTrainingCourse
	};
}

export const trainingCourses = createTrainingCoursesStore();
