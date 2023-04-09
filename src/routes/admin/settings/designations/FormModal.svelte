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
		name: yup.string().required('Nama is required')
	});

	const { form, reset, createSubmitHandler, setFields, data,errors } = createForm({
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
					bind:value={$data.name}
					name="name"
					labelText="Name"
					placeholder="Enter  name..."
				/>
				{#if $errors.name}
					<p class="t-text-red-500">{$errors.name}</p>
				{/if}
			</div>
		</div>
	</form>
</Modal>
