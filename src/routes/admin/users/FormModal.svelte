<script lang="ts">
	import { users } from '$lib/store/users';
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
	import { onMount } from 'svelte';

	export let user = {
		id: null,
		username: null,
		email: null,
		firstname: null,
		lastname: null,
		password: null
	};
	onMount(async () => {
		users.getUsers();
	});

	export let open = true;

	async function onSubmit(event) {
		if (user.id) {
			await users.updateUser({ ...user });
		} else {
			await users.createUser({ ...user });
			//  event.target.reset();
		}
		open = false;
	}
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={user.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={onSubmit}
>
	<form>
		<TextInput bind:value={user.email} labelText=" Email" placeholder="Enter  name..." />
		<TextInput bind:value={user.firstname} labelText="First Name" placeholder="Enter  name..." />
		<TextInput bind:value={user.lastname} labelText="Last Name" placeholder="Enter  name..." />
		<TextInput bind:value={user.username} labelText=" User Name" placeholder="Enter  name..." />
		{#if user.id == null}
			<PasswordInput
				bind:value={user.password}
				labelText="Password"
				placeholder="Enter password..."
			/>
		{/if}
	</form>
	</Modal>

<!-- <div>
	<form on:submit={onSubmit}>
		<TextInput bind:value={user.name} labelText=" name" placeholder="Enter  name..." />
		<Button type="submit">submit</Button>
	</form>
</div> -->
