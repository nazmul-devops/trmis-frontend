<script>
	import Chart from './Chart.svelte';
	import Count from './Count.svelte';
	import Map from '$lib/map.svelte';
	import { store } from '$lib/store/hooks/auth';
	import LoginPage from './login/+page.svelte';
</script>

<div>
	{#if $store != null}
		<Count />
		<Chart />
		<Map />
	{:else}
		<LoginPage />
	{/if}
</div>
