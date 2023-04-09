<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { changePass } from '$lib/service/changePass';
	import { Modal, PasswordInput, TextInput } from 'carbon-components-svelte';
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
		old_password: yup.string().required('Old password is required'),
		new_password: yup.string().required('New password is required'),
		confirm_password: yup.string().oneOf([yup.ref('new_password'), null], 'Passwords must match').required("Password is required.")
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

<div class="changePasswordModal">
	<Modal
		size="xs"
		bind:open
		modalHeading="Change Password"
		primaryButtonText="Change"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:submit={submitHandler}
	>
		<form use:form>
			<div class=" t-grid t-grid-cols-1 changePasswordModalForm">
				<div class="t-mb-2">
					<PasswordInput
						invalid={$errors.old_password != null}
						name="old_password"
						labelText=""
						placeholder="Enter Old Password..."
					/>
					{#if $errors.old_password}
						<p class="t-text-red-500">{$errors.old_password}</p>
					{/if}
				</div>
				<div class="t-mb-2">
					<PasswordInput
						invalid={$errors.new_password != null}
						name="new_password"
						labelText=""
						placeholder="Enter New Password..."
					/>
					{#if $errors.new_password}
						<p class="t-text-red-500">{$errors.new_password}</p>
					{/if}
				</div>
				<div class="t-mb-2">
					<PasswordInput
						invalid={$errors.confirm_password != null}
						name="confirm_password"
						labelText=""
						placeholder="Enter Confirm Password..."
					/>
					{#if $errors.confirm_password}
						<p class="t-text-red-500">{$errors.confirm_password}</p>
					{/if}
				</div>
			</div>
		</form>
	</Modal>
</div>
