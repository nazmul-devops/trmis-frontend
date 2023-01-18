<script>
	import 'leaflet/dist/leaflet.css';
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import { browser } from '$app/environment';

	let mapElement;
	let map;

	let markers = [];

	let markerObjes = [];

	$: {
		markerObjes.forEach((item) => {
			map.removeLayer(item);
		});
		markerObjes = markers.map((marker) => {
			return L.marker(marker).addTo(map);
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

			setTimeout(() => {
				markers = [
					[23.9, 90.3],
					[23.7103, 90.5125],
					[23.73, 90.54],
					[23.83, 90.64],
					[23.93, 90.674],
					[23.893, 90.714],
					[23.673, 90.574],
					[23.573, 90.84]
				];
			}, 0);

			// setTimeout(() => {
			// 	markers = [
			// 		[51.5, -0.13],
			// 		[51.5, -0.11]
			// 	];
			// }, 3000);
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
