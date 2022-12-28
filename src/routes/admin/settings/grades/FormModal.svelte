<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { grades } from '$lib/store/grades';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let grade = {
		id: null,
		name: null
	};

	$: {
		setFields('name', grade.name);
	}

	const schema = yup.object({
		name: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (grade.id) {
				await grades.updateGrade({ ...data, id: grade.id });
			} else {
				await grades.createGrade({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		grades.getGrades();
	});
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={grade.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
	</form>
</Modal>
