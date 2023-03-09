<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { organizations } from '$lib/store/organization';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let organization = {
		id: null,
		name: null,
		serial_no: null,
		remarks: null
	};

	$: {
		if (organization.id != null) {
			setFields('name', organization.name);
			setFields('serial_no', organization.serial_no);
			setFields('remarks', organization.remarks);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required(),
		serial_no: yup.number().required(),
		remarks: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		transform: (values: any) => {
			return {
				...values,
				serial_no: values.serial_no ? parseInt(values.serial_no) : null
			};
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (organization.id) {
				await organizations.updateOrganization({ ...data, id: organization.id });
			} else {
				await organizations.createOrganization({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		organizations.getOrganizations();
	});
</script>

<Modal
	bind:open
	modalHeading={organization.id == null ? 'Create Organizations' : 'Edit Organizations'}
	primaryButtonText={organization.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
		<TextInput name="serial_no" labelText="Serial_No" placeholder="Enter  serial_no..." />
		{#if $errors.serial_no}
			<p class=" t-text-red-600 ">{$errors.serial_no}</p>
		{/if}
		<TextInput name="remarks" labelText=" Remarks" placeholder="Enter  Remarks..." />
	</form>
</Modal>
