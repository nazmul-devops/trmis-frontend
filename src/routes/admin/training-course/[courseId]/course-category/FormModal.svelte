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
		setFields('title', courseCategory.title);
		setFields('description', courseCategory.description);
	}

	const schema = yup.object({
		title: yup.string().required(),
		description: yup.string().required()
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
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="title" labelText="title" placeholder="Enter  Title..." />
		<TextInput name="description" labelText="Description" placeholder="Enter  description..." />
	</form>
</Modal>
