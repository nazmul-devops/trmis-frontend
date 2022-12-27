<script lang="ts">
	import {
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Checkbox,
		TextInput,
		Button,
		PasswordInput
	} from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import axios from 'axios';

	let message = null;

	const schema = yup.object({
		currentPassword: yup.string().required(),
		newPassword: yup.string().required(),
		confirmPassword: yup.string().required()
	});

	const { form, errors, reset, createSubmitHandler } = createForm({
		extend: validator({ schema })
	});
	export let open = true;

	const submitHandler = createSubmitHandler({
		onSubmit: async (params) => {
			console.log(params);
			open = false;
		}
	});
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText="edit"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<PasswordInput
			name="currentPassword"
			labelText="Current Password"
			placeholder="Enter password..."
		/>
		<PasswordInput name="newPassword" labelText="New Password" placeholder="Enter password..." />
		<PasswordInput
			name="confirmPassword"
			labelText="Confirm Password"
			placeholder="Enter password..."
		/>
		{#if message}
			<p class=" t-text-red-500 ">{message}</p>
		{/if}
	</form>
</Modal>
