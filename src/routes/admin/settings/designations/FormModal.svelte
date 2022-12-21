<script lang="ts">
	import { designations } from '$lib/store/designations';
	// import { getDesignations } from '$lib/service/designations';
	import {
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Checkbox,
		TextInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let designation = {
		id: null,
		name: null
	};
	onMount(async () => {
		designations.getDesignations();
	});

	export let open = true;

	async function onSubmit() {
		if (designation.id) {
			await designations.updateDesignation({ ...designation });
		} else {
			await designations.createDesignation({ ...designation });
		}
		open = false;
	}
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={designation.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={onSubmit}
>
	<form>
		<TextInput bind:value={designation.name} labelText=" name" placeholder="Enter  name..." />
	</form>
</Modal>
