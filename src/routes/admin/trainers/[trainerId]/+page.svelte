<script lang="ts">
	import { page } from '$app/stores';
	import Form from '../Form.svelte';
	import { onMount } from 'svelte';
	import { getTrainer } from '$lib/service/service';

	let trainerData;

	function edit(event) {
		console.log('edit', event.detail);
	}

	onMount(async () => {
		let { status, data } = await getTrainer($page.params.trainerId);
		trainerData = data;
	});
</script>

<h1>{JSON.stringify($page.params)}</h1>

<Form formType="edit" initialData={trainerData} on:edit={edit} />
