<script lang="ts">
	import { cordinators } from '$lib/store/trainingCordinators';
	import { Modal, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let cordinator = {
		id: null,
		name: null,
		code: null,
		phone: null,
		alt_phone: null,
		email: null
	};
	onMount(async () => {
		cordinators.getCordinators();
	});

	export let open = true;

	async function onSubmit() {
		if (cordinator.id) {
			await cordinators.updateCordinator({ ...cordinator });
		} else {
			await cordinators.createCordinator({ ...cordinator });
		}
		open = false;
	}
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={cordinator.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={onSubmit}
>
	<form>
		<TextInput bind:value={cordinator.name} labelText=" name" placeholder="Enter  name..." />
		<TextInput bind:value={cordinator.code} labelText="Code" />
		<TextInput bind:value={cordinator.phone} labelText="Phone" />
		<TextInput bind:value={cordinator.alt_phone} labelText="Alt Phone" />
		<TextInput bind:value={cordinator.email} labelText=" mail" placeholder="Enter  name..." />
	</form>
</Modal>
