import { http } from '$lib/service/auth';

export async function getCompletedCourses(traineeId) {
	try {
		const { data } = await http.get(`trainee/${traineeId}/training-course/`);

		return {
			status: 200,
			data
		};
	} catch (err) {
		return Promise.resolve({
			status: 400,
			data: []
		});
	}
}
