import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import { logout as logoutService } from '$lib/service/auth';
const accessToken = writable();

export function setAccessToken() {
	const token = localStorage.getItem('accessToken');
	if (token != null) {
		accessToken.set(token);
	}
}
export const isAuthincated = derived(accessToken, ($token) => {
	return $token != null;
});

export function logout() {
	accessToken.set(null);
	logoutService()
}

if (browser) {
	setAccessToken();
}
