<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { coordinators } from '$lib/store/coordinators';
	import { Modal, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let coordinator = {
		id: null,
		name: null,
		code: null,
		phone: null,
		alt_phone: null,
		email: null
	};

	$: {
		setFields('name', coordinator.name);
		setFields('code', coordinator.code);
		setFields('phone', coordinator.phone);
		setFields('alt_phone', coordinator.alt_phone);
		setFields('email', coordinator.email);
	}

	const schema = yup.object({
		name: yup.string().required(),
		code: yup.string().required(),
		phone: yup.number().required(),
		alt_phone: yup.number(),
		email: yup.string().email().required()
	});

	const { form, reset, createSubmitHandler, setFields } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (coordinator.id) {
				await coordinators.updateCoordinator({ ...data, id: coordinator.id });
			} else {
				await coordinators.createCoordinator({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		coordinators.getCoordinators();
	});
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={coordinator.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
		<TextInput name="code" labelText=" Code" placeholder="Enter  code..." />
		<NumberInput name="phone" label="phone" placeholder="Enter  phone..." />
		<NumberInput name="alt_phone" label="alt_phone" placeholder="Enter  alt_phone..." />
		<TextInput name="email" labelText="Email" placeholder="Enter  Email..." />
	</form>
</Modal>
