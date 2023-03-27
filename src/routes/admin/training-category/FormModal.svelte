<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { courseCategories } from '$lib/store/courseCategory';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let courseCategory = {
		id: null,
		title: null,
		description: null
	};

	$: {
		if (courseCategory.id != null) {
			setFields('title', courseCategory.title);
			setFields('description', courseCategory.description);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		title: yup.string().required().typeError('Title is required.'),
		description: yup.string().required().typeError('Description is required.')
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (courseCategory.id) {
				await courseCategories.updateCourseCategory({ ...data, id: courseCategory.id });
			} else {
				await courseCategories.createCourseCategory({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		courseCategories.getCourseCategories();
	});
</script>

<Modal
	bind:open
	modalHeading={courseCategory.id === null ? 'Create training Category' : 'Edit training Category'}
	primaryButtonText={courseCategory.id == null ? 'Create' : 'Edit'}
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					invalid={$errors.title != null}
					name="title"
					labelText="title"
					placeholder="Enter  Title..."
				/>
				{#if $errors.title}
					<p class="t-text-red-500">{$errors.title}</p>
				{/if}
			</div>
			<div>
				<TextInput
					invalid={$errors.description != null}
					name="description"
					labelText="Description"
					placeholder="Enter  description..."
				/>
				{#if $errors.description}
					<p class="t-text-red-500">{$errors.description}</p>
				{/if}
			</div>
		</div>
	</form>
</Modal>
