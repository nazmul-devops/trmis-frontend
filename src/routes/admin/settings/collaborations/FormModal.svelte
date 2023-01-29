<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { collaborations } from '$lib/store/collaboration';
	import { Modal, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let collaboration = {
		id: null,
		name: null,
		serial_no: null,
		remarks: null
	};

	$: {
		setFields('name', collaboration.name);
		setFields('serial_no', collaboration.serial_no);
		setFields('remarks', collaboration.remarks);
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
			if (collaboration.id) {
				await collaborations.updateCollaboration({ ...data, id: collaboration.id });
			} else {
				await collaborations.createCollaboration({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		collaborations.getCollaborations();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Collaborations"
	primaryButtonText={collaboration.id == null ? 'Create' : 'Edit'}
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
