<script lang="ts">
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import { getProfileInfo, updateProfile } from './service';
	import * as yup from 'yup';
	import { createEventDispatcher, onMount } from 'svelte';

	const schema = yup.object({
		userName: yup.string().required(),
		firstName: yup.string().required(),
		lastName: yup.string().required()
	});

	const { form, errors, reset, createSubmitHandler, setFields } = createForm({
		extend: validator({ schema })
	});
	export let open = true;
	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			updateProfile(data);
			open = false;
			dispatch('updateDone');
		}
	});

	onMount(async () => {
		let { data } = await getProfileInfo();
		setFields('userName', data.userName);
		setFields('firstName', data.firstName);
		setFields('lastName', data.lastName);
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
		<TextInput name="userName" labelText=" Email" placeholder="Enter  name..." />
		<TextInput name="firstName" labelText=" Email" placeholder="Enter  name..." />
		<TextInput name="lastName" labelText=" Email" placeholder="Enter  name..." />
	</form>
</Modal>
