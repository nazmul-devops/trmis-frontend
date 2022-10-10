import { http } from '$lib/service/auth';


export async function getTrainers() {
	try {
		let { data } = await http.get('trainers');
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

export async function getTrainer(id) {
	console.log(id);
	try {
		let { data } = await http.get(`trainers/${id}`);
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
