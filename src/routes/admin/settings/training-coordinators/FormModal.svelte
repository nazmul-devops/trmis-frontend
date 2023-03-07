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
		// code: null,
		phone: null,
		// alt_phone: null,
		email: null
	};

	$: {
		if (coordinator.id != null) {
			setFields('name', coordinator.name);
			// setFields('code', coordinator.code);
			setFields('phone', coordinator.phone);
			// setFields('alt_phone', coordinator.alt_phone);
			setFields('email', coordinator.email);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required().typeError('Name is required'),
		// code: yup.string().required(),
		phone: yup.number().required().typeError('Phone number is required.'),
		// alt_phone: yup.number(),
		email: yup.string().email().required()
	});

	const { form, reset, errors, createSubmitHandler, setFields } = createForm({
		transform: (values: any) => {
			return {
				...values,
				phone: values.phone ? parseInt(values.phone) : null
				// alt_phone: values.alt_phone ? parseInt(values.alt_phone) : null
			};
		},
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
	modalHeading={coordinator.id == null
		? 'Create Training Coordinator'
		: 'Edit Training Coordinator'}
	primaryButtonText={coordinator.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput invalid={$errors.name} name="name" labelText=" name" placeholder="Enter  name..." />
		{#if $errors.name}
			<p class="t-text-red-500">{$errors.name}</p>
		{/if}

		<!-- <TextInput name="code" labelText=" Code" placeholder="Enter  code..." /> -->
		<TextInput
			invalid={$errors.phone}
			name="phone"
			labelText="phone"
			placeholder="Enter  phone..."
		/>
		{#if $errors.phone}
			<p class="t-text-red-500">{$errors.phone}</p>
		{/if}
		<!-- <TextInput name="alt_phone" labelText="alt_phone" placeholder="Enter  alt_phone..." /> -->
		<TextInput
			invalid={$errors.email}
			name="email"
			labelText="Email"
			placeholder="Enter  Email..."
		/>
		{#if $errors.email}
			<p class="t-text-red-500">{$errors.email}</p>
		{/if}
	</form>
</Modal>
