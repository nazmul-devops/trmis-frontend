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
		phone: null,
		email: null
	};

	$: {
		if (coordinator.id != null) {
			setFields('name', coordinator.name);
			setFields('phone', coordinator.phone);
			setFields('email', coordinator.email);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required().typeError('Name is required'),
		phone: yup.number().required().typeError('Phone number is required.'),
		email: yup.string().email().required()
	});

	const { form, reset, errors, createSubmitHandler, setFields } = createForm({
		transform: (values: any) => {
			return {
				...values,
				phone: values.phone ? parseInt(values.phone) : null
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
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<TextInput
					invalid={$errors.name}
					name="name"
					labelText=" name"
					placeholder="Enter  name..."
				/>
				{#if $errors.name}
					<p class="t-text-red-500">{$errors.name}</p>
				{/if}
			</div>

			<div>
				<TextInput
					invalid={$errors.phone}
					name="phone"
					labelText="phone"
					placeholder="Enter  phone..."
				/>
				{#if $errors.phone}
					<p class="t-text-red-500">{$errors.phone}</p>
				{/if}
			</div>

			<div>
				<TextInput
					invalid={$errors.email}
					name="email"
					labelText="Email"
					placeholder="Enter  Email..."
				/>
				{#if $errors.email}
					<p class="t-text-red-500">{$errors.email}</p>
				{/if}
			</div>
		</div>
	</form>
</Modal>
