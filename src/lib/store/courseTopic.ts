import { writable, get } from 'svelte/store';
import * as CourseTopicsService from '$lib/service/courseTopic';

function createCourseTopicsStore() {
	const topic = writable({ loading: true, data: [], trainingCourseId: null });
	function setLoading() {
		topic.update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getCourseTopics(trainingCourse) {
		setLoading();
		const resp = await CourseTopicsService.getCourseTopics(trainingCourse);
		topic.set({ loading: false, data: resp.data, trainingCourseId: trainingCourse });
	}

	async function deleteCourseTopic(id: number) {
		setLoading();
		await CourseTopicsService.deleteCourseTopic(id);
		await getCourseTopics(get(topic).trainingCourseId);
	}

	async function updateCourseTopic(courseTopic) {
		setLoading();
		await CourseTopicsService.updateCourseTopic(courseTopic);
		await getCourseTopics(get(topic).trainingCourseId);
	}
	async function createCourseTopic(courseTopic) {
		setLoading();
		await CourseTopicsService.createCourseTopic(courseTopic);
		await getCourseTopics(get(topic).trainingCourseId);
	}

	return {
		subscribe: topic.subscribe,
		getCourseTopics,
		deleteCourseTopic,
		updateCourseTopic,
		createCourseTopic
	};
}

export const courseTopics = createCourseTopicsStore();
