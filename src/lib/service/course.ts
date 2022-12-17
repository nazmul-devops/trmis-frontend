import { http } from '$lib/service/auth';

export async function getCourses() {
	try {
		let { data } = await http.get('courses');
		return {
			status: 200,
			data: data
		};
	} catch (error) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}
export async function getCourse(id) {
	console.log(id);
	try {
		let { data } = await http.get(`courses/${id}`);
		return {
			status: 200,
			data: data
		};
	} catch (error) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}
