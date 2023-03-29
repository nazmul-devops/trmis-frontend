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
		name: null,
		// serial_no: null
	};

	$: {
		if (designation.id != null) {
			setFields('name', designation.name);
			// setFields('serial_no', designation.serial_no);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required().typeError('Nama is required'),
		// serial_no: yup.number().required('').typeError('Serial No. must be a number')
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		// transform: (values: any) => {
		// 	return {
		// 		...values,
		// 		serial_no: values.serial_no ? parseInt(values.serial_no) : null
		// 	};
		// },
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
	size="xs"
	modalHeading={designation.id == null ? 'Create Designations' : 'Edit Designations'}
	primaryButtonText={designation.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-1 t-gap-4">
			<div>
				<TextInput
				invalid={$errors.name != null}
				name="name"
				labelText=" name"
				placeholder="Enter  name..."
			/>
			{#if $errors.name}
				<p class="t-text-red-500">{$errors.name}</p>
			{/if}
			</div>
			<!-- <div>
				<TextInput
				invalid={$errors.serial_no}
				name="serial_no"
				labelText="Serial_No"
				placeholder="Enter  serial_no..."
			/>
			{#if $errors.serial_no}
				<p class="t-text-red-500">{$errors.serial_no}</p>
			{/if}
			</div> -->
		</div>
	</form>
</Modal>
