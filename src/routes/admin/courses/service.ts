import axios from 'axios';

export async function getTrainingCourses() {
	try {
		let { data } = await axios.get('http://localhost:3000/trainingCourses/');
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
export async function getTrainingCourse(id) {
	console.log(id);
	try {
		let { data } = await axios.get(`http://localhost:3000/trainingCourses/${id}`);
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
