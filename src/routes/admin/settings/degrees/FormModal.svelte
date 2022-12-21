<script lang="ts">
	import { degrees } from '$lib/store/degrees';
	import {
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Checkbox,
		TextInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let degree = {
		id: null,
		name: null
	};
	onMount(async () => {
		degrees.getDegrees();
	});

	export let open = true;

	async function onSubmit() {
		if (degree.id) {
			await degrees.updateDegree({ ...degree });
		} else {
			await degrees.createDegree({ ...degree });
		}
		open = false;
	}
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={degree.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={onSubmit}
>
	<form>
		<TextInput bind:value={degree.name} labelText=" name" placeholder="Enter  name..." />
	</form>
</Modal>
