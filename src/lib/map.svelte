<script>
	import { onMount, onDestroy } from 'svelte';
	import L from 'leaflet';
	import { browser } from '$app/environment';

	let mapElement;
	let map;

	let markers = [
		[51.5, -0.09],
		[51.5, -0.11],
		[51.5, -0.13]
	];

	function addMarkerToMap() {
		markers.forEach((item) => {
			L.marker(item).addTo(map);
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

			addMarkerToMap();

			setTimeout(() => {
				markers = [...markers, [51.5, -0.15]];
				addMarkerToMap();
			}, 1000);
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
	<div class="t-h-[500px] t-w-[1000px]" bind:this={mapElement} />
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
