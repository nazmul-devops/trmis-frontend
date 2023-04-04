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
					: resp.data.map((item, index) => ({
							...item,
							id: `${item.batch}-${item.training_course}-${item.org_id}-${item.training_center}`
					  }))
		});
	}

	return {
		subscribe,
		getCompletedCourses
	};
}

export const completedCourses = createCompletedCourseStore();
