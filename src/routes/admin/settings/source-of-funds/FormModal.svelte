<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import { Modal, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let sourceOfFound = {
		id: null,
		name: null,
		serial_no: null,
		remarks: null
	};

	$: {
		setFields('name', sourceOfFound.name);
		setFields('serial_no', sourceOfFound.serial_no);
		setFields('remarks', sourceOfFound.remarks	);
	}

	const schema = yup.object({
		name: yup.string().required(),
		serial_no: yup.number().required(),
		remarks: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
		transform: (values: any) => {
			return {
				...values,
				serial_no: values.serial_no ? parseInt(values.serial_no) : null,

			}
		},
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (sourceOfFound.id) {
				await sourceOfFounds.updateSourceOfFund({ ...data, id: sourceOfFound.id });
			} else {
				await sourceOfFounds.createSourceOfFund({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		sourceOfFounds.getSourceOfFounds();
	});
</script>

<Modal
	bind:open
	modalHeading={sourceOfFound.id == null ? "Create Source Of Fund" : "Edit Source Of Fund"}
	primaryButtonText={sourceOfFound.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
		<TextInput name="serial_no" labelText="Serial_No" placeholder="Enter  serial_no..." />
		<TextInput name="remarks" labelText=" Remarks" placeholder="Enter  Remarks..." />
	</form>
</Modal>
