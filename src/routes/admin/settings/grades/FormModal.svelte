<script lang="ts">
	import { grades } from '$lib/store/grades';
	import {
		Modal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Checkbox,
		TextInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let grade = {
		id: null,
		name: null
	};
	onMount(async () => {
		grades.getGrades();
	});

	export let open = true;

	async function onSubmit() {
		if (grade.id) {
			await grades.updateGrade({ ...grade });
		} else {
			await grades.createGrade({ ...grade });
		}
		open = false;
	}
</script>

<Modal
	bind:open
	modalHeading="Create database"
	primaryButtonText={grade.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={onSubmit}
>
	<form>
		<TextInput bind:value={grade.name} labelText=" name" placeholder="Enter  name..." />
	</form>
</Modal>
