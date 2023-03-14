<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { changePass } from '$lib/service/changePass';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let designation = {
		id: null,
		old_password: null,
		new_password: null,
		confirm_password: null
	};

	// $: {
	// 	if (designation.id != null) {
	// 		setFields('name', designation.name);
	// 		setFields('serial_no', designation.serial_no);
	// 	} else {
	// 		reset();
	// 	}
	// }

	const schema = yup.object({
		old_password: yup.string().required(),
		new_password: yup.string().required('Password is required'),
		confirm_password: yup.string().oneOf([yup.ref('new_password'), null], 'Passwords must match')
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await changePass({ ...data });
			open = false;
			reset();
		}
	});

	// onMount(async () => {
	// 	designations.getDesignations();
	// });
</script>

<Modal
	bind:open
	modalHeading="Change Password"
	primaryButtonText="Save"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			invalid={$errors.old_password}
			name="old_password"
			labelText="Old Password"
			placeholder="Enter Old Password..."
		/>
		{#if $errors.name}
			<p class="t-text-red-500">{$errors.old_password}</p>
		{/if}
		<TextInput
			invalid={$errors.new_password}
			name="new_password"
			labelText="New Password"
			placeholder="Enter New Password..."
		/>
		{#if $errors.serial_no}
			<p class="t-text-red-500">{$errors.new_password}</p>
		{/if}
		<TextInput
			invalid={$errors.confirm_password}
			name="confirm_password"
			labelText="Confirm Password"
			placeholder="Enter Confirm Password..."
		/>
		{#if $errors.serial_no}
			<p class="t-text-red-500">{$errors.confirm_password}</p>
		{/if}
	</form>
</Modal>
