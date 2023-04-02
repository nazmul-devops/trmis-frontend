<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { getDetails, changeDetails } from '$lib/service/changeDetails';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { string } from 'yup/lib/locale';

	export let open = true;
	export let userDetails = {
		id: null,
		first_name: null,
		last_name: null,
		email: null
	};

	$: {
		setData('first_name', userDetails.first_name);
		setData('last_name', userDetails.last_name);
		setData('email', userDetails.email);
	}

	// $: {
	// 	if (designation.id != null) {
	// 		setFields('name', designation.name);
	// 		setFields('serial_no', designation.serial_no);
	// 	} else {
	// 		reset();
	// 	}
	// }

	const schema = yup.object({
		first_name: yup.string().required('First Name is required'),
		last_name: yup.string().required('Last Name is required'),
		email: yup.string().email().required()
	});

	const { form, data, reset, createSubmitHandler, setData, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await changeDetails({ ...data });
			open = false;
			reset();
			getDetails();
		}
	});
	 
	$: {
		getDetails().then(resp => {
			userDetails = resp.data[0];
		})
		
	}

	// onMount(async () => {
		
	// });
</script>

<div class="changeDetailsModal">
	<Modal
		size="xs"
		bind:open
		modalHeading="Change User Details"
		primaryButtonText="Change"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:submit={submitHandler}
	>
		<form use:form>
			<div class=" t-grid t-grid-cols-1 changeDetailsModalForm">
				<div class="t-mb-2">
					<TextInput
						bind:value={$data.first_name}
						invalid={$errors.firt_name != null}
						name="first_name"
						labelText=""
						placeholder="Enter First Name..."
					/>
					{#if $errors.first_name}
						<p class="t-text-red-500">{$errors.first_name}</p>
					{/if}
				</div>
				<div class="t-mb-2">
					<TextInput
						bind:value={$data.last_name}
						invalid={$errors.last_name != null}
						name="last_name"
						labelText=""
						placeholder="Enter Last Name..."
					/>
					{#if $errors.last_name}
						<p class="t-text-red-500">{$errors.last_name}</p>
					{/if}
				</div>
				<div class="t-mb-2">
					<TextInput
						bind:value={$data.email}
						invalid={$errors.email != null}
						name="email"
						labelText=""
						placeholder="Enter Email Address..."
					/>
					{#if $errors.email}
						<p class="t-text-red-500">{$errors.email}</p>
					{/if}
				</div>
			</div>
		</form>
	</Modal>
</div>
