<script>
	import 'leaflet/dist/leaflet.css';
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import { browser } from '$app/environment';
	import * as trainingCenter from '../lib/service/trainingCenter';
	import { get } from 'svelte/store';
	// import { trainingCenters } from './store/trainingCenter';

	export let division = null;
	export let district = null;
	export let subDistrict = null;
	export let organization = null;

	let mapElement;
	let map;

	let markers = [];
	let info;

	let markerObjes = [];
	// $: latLong = getTrainingCenterMap.data.map((item) => ({ ...item, text: item.name }));
	async function getMapData(filter) {
		const { data } = await trainingCenter.getTrainingCenterMap(filter);
		markers = data.lat_long;
		info = data.info;
		info = `
				No of Batchs: ${info.no_of_batch} <br>
				No of participants: ${info.no_of_trainee}
			`;
	}

	$: {
		let params = {
			division: division,
			district: district,
			sub_district: subDistrict,
			organization: organization
		};
		getMapData(params);
	}

	$: {
		markerObjes.forEach((item) => {
			map.removeLayer(item);
		});
		markerObjes = markers.map((marker) => {
			return L.marker(marker).bindPopup(info).addTo(map);
		});
	}

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet.map(mapElement).setView([23.8103, 90.4125], 7);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			getMapData({});
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main>
	<div class="t-h-[70vh] t-z-10 t-w-100" bind:this={mapElement} />
</main>

<!-- <style>
	/* @import 'leaflet/dist/leaflet.css'; */
</style> -->
