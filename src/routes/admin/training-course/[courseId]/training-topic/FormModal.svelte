<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { courseTopics } from '$lib/store/courseTopic';
	import { Modal, TextInput, Select, SelectItem, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let open = true;
	export let courseTopic = {
		id: null,
		title: null,
		description: null
	};

	$: {
		if (courseTopic.id != null) {
			setFields('title', courseTopic.title);
			setFields('description', courseTopic.description);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		title: yup.string().required('Title is required.'),
		description: yup.string().required('Description is required.')
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				training_course: parseInt(values.training_course_id)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (courseTopic.id) {
				await courseTopics.updateCourseTopic({ ...data, id: courseTopic.id });
			} else {
				await courseTopics.createCourseTopic({
					...data,
					// training_course: parseInt($page.params.courseId)
					title: courseTopic.title
				});
			}
			open = false;
			reset();
		}
	});

	$: {
		courseTopics.getCourseTopics($page.params.courseId);
	}

	$: {
		console.log($page.params.courseId);
	}

	onMount(async () => {
		trainingCourses.getTrainingCourses();
	});
</script>

<Modal
	bind:open
	modalHeading={courseTopic.id === null ? 'Create training Topic' : 'Edit training Topic'}
	primaryButtonText={courseTopic.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					name="title"
					labelText="title"
					placeholder="Enter  Title..."
					invalid={$errors.title != null}
				/>
				{#if $errors.title}
					<p class="t-text-red-600">{$errors.title}</p>
				{/if}
			</div>
			<div>
				<TextInput
					name="description"
					labelText="Description"
					placeholder="Enter  description..."
					invalid={$errors.description != null}
				/>
				{#if $errors.description}
					<p class="t-text-red-600">{$errors.description}</p>
				{/if}
			</div>
			<!-- {JSON.stringify($errors)} -->
		</div>
	</form>
</Modal>
