<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { organizations } from '$lib/store/organization';
	import { Modal, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let organization = {
		id: null,
		name: null,
		serial_no: null,
		remarks: null
	};

	$: {
		setFields('name', organization.name);
		setFields('serial_no', organization.serial_no);
		setFields('remarks', organization.remarks	);
	}

	const schema = yup.object({
		name: yup.string().required(),
		serial_no: yup.number().required(),
		remarks: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
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
	modalHeading="Create Organizations"
	primaryButtonText={organization.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
		<NumberInput name="serial_no" label="Serial_No" placeholder="Enter  serial_no..." />
		<TextInput name="remarks" labelText=" Remarks" placeholder="Enter  Remarks..." />
	</form>
</Modal>
