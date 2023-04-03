import { writable, get } from 'svelte/store';
import * as trainingCoursesService from '../service/trainingCourse';

function createTrainingCoursesStore() {
	const training = writable({ loading: true, data: [], trainingCategory: null });
	function setLoading() {
		training.update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainingCourses(courseCategory = null) {
		setLoading();
		const resp = await trainingCoursesService.getTrainingCourses(courseCategory);
		training.set({ loading: false, data: resp.data, trainingCategory: courseCategory });
	}

	async function deleteTrainingCourse(id: number) {
		setLoading();
		await trainingCoursesService.deleteTrainingCourse(id);
		await getTrainingCourses(get(training).trainingCategory);
	}

	async function updateTrainingCourse(trainigCourse) {
		setLoading();
		await trainingCoursesService.updateTrainingCourse(trainigCourse);
		await getTrainingCourses(get(training).trainingCategory);
	}
	async function createTrainingCourse(trainigCourse) {
		setLoading();
		await trainingCoursesService.createTrainingCourse(trainigCourse);
		await getTrainingCourses(get(training).trainingCategory);
	}

	return {
		subscribe: training.subscribe,
		getTrainingCourses,
		deleteTrainingCourse,
		updateTrainingCourse,
		createTrainingCourse
	};
}

export const trainingCourses = createTrainingCoursesStore();
