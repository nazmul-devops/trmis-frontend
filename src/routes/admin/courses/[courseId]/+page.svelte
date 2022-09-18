<script lang="ts">
	import { page } from '$app/stores';
	import Form from '../Form.svelte';
	import { onMount } from 'svelte';
	// import { getTrainer } from '$lib/service/service';
	import { getTrainingCourse } from '../service';

	let courseData;

	function edit(event) {
		console.log('edit', event.detail);
	}

	onMount(async () => {
		let { status, data } = await getTrainingCourse($page.params.courseId);
		courseData = data;
	});
</script>

<h1>{JSON.stringify($page.params)}</h1>

<Form formType="edit" initialData={courseData} on:edit={edit} />
