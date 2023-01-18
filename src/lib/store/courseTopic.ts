import { writable } from 'svelte/store';
import * as CourseTopicsService from '$lib/service/courseTopic';

function createCourseTopicsStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCourseTopics() {
		setLoading();
		const resp = await CourseTopicsService.getCourseTopics();
		set({ loading: false, data: resp.data });
	}

	async function deleteCourseTopic(id: number) {
		setLoading();
		await CourseTopicsService.deleteCourseTopic(id);
		await getCourseTopics();
	}

	async function updateCourseTopic(courseTopic) {
		setLoading();
		await CourseTopicsService.updateCourseTopic(courseTopic);
		await getCourseTopics();
	}
	async function createCourseTopic(courseTopic) {
		setLoading();
		await CourseTopicsService.createCourseTopic(courseTopic);
		await getCourseTopics();
	}

	return {
		subscribe,
		getCourseTopics,
		deleteCourseTopic,
		updateCourseTopic,
		createCourseTopic
	};
}

export const courseTopics = createCourseTopicsStore();
