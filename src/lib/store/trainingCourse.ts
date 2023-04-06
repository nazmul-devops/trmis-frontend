import { writable, get } from 'svelte/store';
import * as trainingCoursesService from '../service/trainingCourse';

function createTrainingCoursesStore() {
	const training = writable({
		loading: true,
		data: [],
		trainingCategory: null,
		errorData: { status: null, errorMessageForCode: null, errorMessageForTitle: null }
	});
	function setLoading() {
		training.update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getTrainingCourses(courseCategory = null) {
		setLoading();
		const resp = await trainingCoursesService.getTrainingCourses(courseCategory);
		training.update((prev) => {
			prev.loading = false;
			prev.trainingCategory = courseCategory;
			prev.data = resp.data;
			return prev;
		});
	}

	async function deleteTrainingCourse(id: number) {
		setLoading();
		await trainingCoursesService.deleteTrainingCourse(id);
		await getTrainingCourses(get(training).trainingCategory);
	}

	async function updateTrainingCourse(trainigCourse) {
		setLoading();
		const { status, errorMessageForCode, errorMessageForTitle } = await trainingCoursesService.updateTrainingCourse(trainigCourse);
		training.update((prev) => {
			prev.errorData.errorMessageForCode = errorMessageForCode;
			prev.errorData.errorMessageForTitle = errorMessageForTitle;
			prev.errorData.status = status;
			return prev;
		});
		await getTrainingCourses(get(training).trainingCategory);
	}
	async function createTrainingCourse(payload) {
		setLoading();
		const { status, errorMessageForCode, errorMessageForTitle } =
			await trainingCoursesService.createTrainingCourse(payload);

		training.update((prev) => {
			prev.errorData.errorMessageForCode = errorMessageForCode;
			prev.errorData.errorMessageForTitle = errorMessageForTitle;
			prev.errorData.status = status;
			return prev;
		});

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
