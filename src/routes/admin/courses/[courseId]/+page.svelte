<script lang="ts">
	import { page } from '$app/stores';
	import Form from '../Form.svelte';
	import { onMount } from 'svelte';
	// import { getTrainer } from '$lib/service/service';
	import { getCourse } from '../service';
	import { get } from 'svelte/store';
	import { courses } from '$lib/store/course';

	let courseData;

	function edit(event) {
		console.log('edit', event.detail);
	}

	onMount(async () => {
		let _courses = get(courses);
		let index = _courses.findIndex((item) => item.id == $page.params.courseId);
		courseData = _courses[index];
	});
</script>

<h1>{JSON.stringify($page.params)}</h1>

<Form formType="edit" initialData={courseData} on:edit={edit} />

{JSON.stringify(courseData)}
