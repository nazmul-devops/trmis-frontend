<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { subDistricts } from '$lib/store/sub-district';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let subDistrict = {
		id: null,
		name: null
	};

	$: {
		setFields('name', subDistrict.name);
	}

	const schema = yup.object({
		name: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (subDistrict.id) {
				await subDistricts.updateSubDistrict({ ...data, id: subDistrict.id });
			} else {
				await subDistricts.createSubDistrict({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		subDistricts.getSubDistricts();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Sub-district"
	primaryButtonText={subDistrict.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText="Sub-district Name" placeholder="Enter  Sub-district Name..." />
	</form>
</Modal>
