<script lang="ts">
	import { degrees } from '$lib/store/degrees';
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

	export let degree = {
		id: null,
		name: null
	};
	onMount(async () => {
		degrees.getDegrees();
	});

	// export let open = true;

	function resetForm() {
		degree.id = null;
		degree.name = null;
	}

	async function onSubmit(event) {
		if (degree.id) {
			await degrees.updateDegree({ ...degree });
		} else {
			await degrees.createDegree({ ...degree });
		}
		// open = false;

		// event.target.reset();
		resetForm();
	}
</script>

<!-- <Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={degree.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={onSubmit}
>
	<form>
		<TextInput bind:value={degree.name} labelText=" Email" placeholder="Enter  name..." />
	</form>
	</Modal> -->

<div>
	<form on:submit|preventDefault={onSubmit}>
		<TextInput bind:value={degree.name} labelText=" name" placeholder="Enter  name..." />
		<Button type="submit">submit</Button>
	</form>
</div>
