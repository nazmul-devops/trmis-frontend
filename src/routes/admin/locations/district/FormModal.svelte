<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { districts } from '$lib/store/district';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let district = {
		id: null,
		name: null
	};

	$: {
		setFields('name', district.name);
	}

	const schema = yup.object({
		name: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (district.id) {
				await districts.updateDistrict({ ...data, id: district.id });
			} else {
				await districts.createDistrict({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		districts.getDistricts();
	});
</script>

<Modal
	bind:open
	modalHeading="Create District"
	primaryButtonText={district.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText="District Name" placeholder="Enter  District Name..." />
	</form>
</Modal>
