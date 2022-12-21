<script lang="ts">
	import { Modal } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	export let open = false;
	const dispatch = createEventDispatcher();
</script>

<Modal
	danger
	bind:open
	modalHeading="Delete all instances"
	primaryButtonText="Delete"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:close
	on:submit={() => dispatch('deleteConfirm')}
>
	<p>Are You Sure Want to Delete?</p>
</Modal>
