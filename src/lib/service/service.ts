import axios from 'axios';

export async function getTrainers() {
	try {
		let { data } = await axios.get('http://localhost:3000/trainers/');
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
		let { data } = await axios.get(`http://localhost:3000/trainers/${id}`);
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
