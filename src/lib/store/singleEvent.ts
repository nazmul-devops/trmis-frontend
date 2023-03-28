import { writable } from 'svelte/store';
import * as singleEventService from '$lib/service/singleEvent';

function createSingleEventStore() {
	const { subscribe, set, update } = writable({ loading: true, data: [] });
	function setLoading() {
		update((prev) => ({
			...prev,
			loading: true
		}));
	}

	async function getSingleEvent(eventId, organization, year, division, district, sub_district) {
		setLoading();
        const resp = await singleEventService.getSingleEvent(
            eventId,
			organization,
			year,
			division,
			district,
			sub_district
		);
		set({
			loading: false,
			data: resp.data
		});
	}

	return {
		subscribe,
		getSingleEvent
	};
}

export const singleEvents = createSingleEventStore();
