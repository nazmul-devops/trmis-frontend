import { writable } from 'svelte/store';
import * as completedCourseService from '$lib/service/completedCourse';

function createCompletedCourseStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [], trainee: null });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCompletedCourses(traineeId) {
		setLoading();
		const resp = await completedCourseService.getCompletedCourses(traineeId);
		set({
			loading: false,
			trainee: resp.trainee,
			data:
				resp.data.length == 0
					? []
					: resp.data.map((item) => ({ ...item, id: item.training_course_id }))
		});
	}

	return {
		subscribe,
		getCompletedCourses
	};
}

export const completedCourses = createCompletedCourseStore();
