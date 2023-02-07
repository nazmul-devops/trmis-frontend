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

	async function getCompletedCourses(traineeId) {
		setLoading();
		const resp = await completedCourseService.getCompletedCourses(traineeId);
		// console.log(resp);
		set({
			loading: false,
			data:
				resp.data.length == 0
					? []
					: resp.data.map((item) => ({ ...item, id: item.training_course_id }))
		});
	}

	async function deleteCompletedCourse(id: number, traineeId) {
		setLoading();
		await completedCourseService.deleteCompletedCourse(id);
		await getCompletedCourses(traineeId);
	}

	async function updateCompletedCourse(payload) {
		setLoading();
		await completedCourseService.updateCompletedCourse(payload);
		await getCompletedCourses(payload.trainee_id);
	}
	async function createCompletedCourse(payload) {
		setLoading();
		await completedCourseService.createCompletedCourse(payload);
		await getCompletedCourses(payload.trainee_id);
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
