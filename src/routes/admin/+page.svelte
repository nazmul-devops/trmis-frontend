<script>
	import Chart from './Chart.svelte';
	import Count from './Count.svelte';
	import Map from '$lib/map.svelte';
</script>

<div class="t-grid t-grid-cols-2 t-gap-4 t-content-center">
	<div class="">
		<Chart />
	</div>
	<div class="">
		<Count />
	</div>
	<div>
		<Map />
	</div>
</div>
