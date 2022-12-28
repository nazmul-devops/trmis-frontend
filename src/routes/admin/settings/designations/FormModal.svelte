<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { designations } from '$lib/store/designations';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let designation = {
		id: null,
		name: null
	};

	$: {
		setFields('name', designation.name);
	}

	const schema = yup.object({
		name: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (designation.id) {
				await designations.updateDesignation({ ...data, id: designation.id });
			} else {
				await designations.createDesignation({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		designations.getDesignations();
	});
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={designation.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
	</form>
</Modal>
