<script lang="ts">
	import { Loading } from "carbon-components-svelte";
	import { page } from '$app/stores';
	import Form from '../Form.svelte';
	import { onMount } from 'svelte';
	import { getTrainer } from '$lib/service/service';

	let trainerData;

	function edit(event) {
		// console.log('edit', event.detail);
	}

	let trainer = getTrainer($page.params.trainerId);

	onMount(async () => {
		let { status, data } = await getTrainer($page.params.trainerId);
		trainerData = data;
	});
</script>


{#await trainer}
	<Loading />
{:then data}
	<Form formType={'edit'} initialData={data.data} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
