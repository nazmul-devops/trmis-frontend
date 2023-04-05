<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let open = true;
	export let trainingCourse = {
		id: null,
		title: null,
		description: null,
		code: null
	};

	$: {
		if (trainingCourse.id != null) {
			setFields('title', trainingCourse.title);
			setFields('description', trainingCourse.description);
			setFields('code', trainingCourse.code);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		title: yup.string().required('Title is required.'),
		description: yup.string().required('Desription is required.'),
		code: yup.string().required('Code is required.')
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				course_category: parseInt(values.course_category)
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (trainingCourse.id) {
				await trainingCourses.updateTrainingCourse({ ...data, id: trainingCourse.id, course_category: $page.params.coursesId });
			} else {
				await trainingCourses.createTrainingCourse({
					...data,
					course_category: $page.params.coursesId
				});
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {});
</script>

<Modal
	preventCloseOnClickOutside
	bind:open
	modalHeading={trainingCourse.id == null ? 'Create training' : 'Edit training'}
	primaryButtonText={trainingCourse.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					invalid={$errors.title != null}
					bind:value={$data.title}
					name="title"
					labelText="Title"
					placeholder="Enter Title..."
				/>
				{#if $errors.title}
					<p class="t-text-sm t-text-red-500">{$errors.title}</p>
				{/if}
			</div>
			<div>
				<TextInput
					invalid={$errors.description != null}
					bind:value={$data.description}
					name="description"
					labelText="Description"
					placeholder="Enter description..."
				/>
				{#if $errors.description}
					<p class="t-text-sm t-text-red-500">{$errors.description}</p>
				{/if}
			</div>
			<div>
				<TextInput
					invalid={$errors.code != null}
					bind:value={$data.code}
					name="code"
					labelText="Code"
					placeholder="Enter Code..."
				/>
				{#if $errors.code}
					<p class="t-text-sm t-text-red-500">{$errors.code}</p>
				{/if}
			</div>
		</div>
		{JSON.stringify($errors)}
		{JSON.stringify($data)}
	</form>
</Modal>
