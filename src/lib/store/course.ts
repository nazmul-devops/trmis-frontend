import { writable, get } from 'svelte/store';
import * as courseService from '$lib/service/course';

function createCourseStore(service) {
	const { subscribe, set, update } = writable([]);

	async function getCourses() {
		const { data } = await courseService.getCourses();
		set(data);
	}

	return {
		subscribe,
		getCourses
	};
}
export const courses = createCourseStore(courseService);
