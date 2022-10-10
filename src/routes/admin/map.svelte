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

			map = leaflet.map(mapElement).setView([51.505, -0.09], 13);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			setTimeout(() => {
				markers = [
					[51.5, -0.15],
					[51.5, -0.17]
				];
			}, 2000);

			setTimeout(() => {
				markers = [
					[51.5, -0.13],
					[51.5, -0.11]
				];
			}, 3000);
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
	<div class="t-h-[500px] t-w-100" bind:this={mapElement} />
</main>

<!-- <style>
	/* @import 'leaflet/dist/leaflet.css'; */
</style> -->
