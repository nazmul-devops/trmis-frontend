<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { divisions } from '$lib/store/division';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let division = {
		id: null,
		name: null
	};

	$: {
		setFields('name', division.name);
	}

	const schema = yup.object({
		name: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			console.log(data);
			// return;
			if (division.id) {
				await divisions.updateDivision({ ...data, id: division.id });
			} else {
				await divisions.createDivision({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		divisions.getDivisions();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Division"
	primaryButtonText={division.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText="Division Name" placeholder="Enter  Division Name..." />
	</form>
</Modal>
