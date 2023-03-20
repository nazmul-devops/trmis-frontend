<script>
	import 'leaflet/dist/leaflet.css';
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import { browser } from '$app/environment';
	import * as trainingCenter from '../lib/service/trainingCenter';
	import { get } from 'svelte/store';
	import { json } from '@sveltejs/kit';
	// import { trainingCenters } from './store/trainingCenter';

	export let division = null;
	export let district = null;
	export let subDistrict = null;
	export let startDate = null;
	export let endDate = null;
	export let viewType = null;

	let mapElement;
	let map;

	let markers = [];
	let info;

	let markerObjes = [];
	let trainingCenterData = [];
	let batchData = [];
	// $: latLong = getTrainingCenterMap.data.map((item) => ({ ...item, text: item.name }));
	async function getMapData(filter) {
		const { data } = await trainingCenter.getTrainingCenterMap(filter);
		console.log(data);
		trainingCenterData = data.training_center_data;
		batchData = data.batch_data;
	}
	$:{
		console.log(startDate)
	}

	$: {
		// if(startDate != null){
		// 	startDate = startDate.toString()

		// }
		let params = {
			division: division,
			district: district,
			sub_district: subDistrict,
			start_date: startDate,
			end_date: endDate
		};
		viewType;
		getMapData(params);
	}

	$: {
		if (viewType == 1) {
			markerObjes.forEach((item) => {
				map.removeLayer(item);
			});
			markerObjes = trainingCenterData.map((marker) => {
				return L.marker(marker.lat_long).bindPopup(`Venue name: ${marker.name}`).addTo(map);
			});
		} else if (viewType == 2) {
			markerObjes.forEach((item) => {
				map.removeLayer(item);
			});
			markerObjes = batchData.map((marker) => {
				return L.marker(marker.lat_long)
					.bindPopup(
						`No of batch: ${marker.no_of_batch} <br> No of Trained Participants: ${marker.no_of_trainee}`
					)
					.addTo(map);
			});
		}
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
