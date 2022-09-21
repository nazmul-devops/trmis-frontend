import { writable } from 'svelte/store';

const user = 'arif@gmail.com';
const pass = '123456';

export const store = writable(null);

let sessions = [];

export const getUserDetails = async (username, password) => {
	if (username === user && password === pass) return 1;
};
