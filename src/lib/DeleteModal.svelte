<script lang="ts">
	import { Modal } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	export let open = false;
	export let name;
	export let textContent=""
	const dispatch = createEventDispatcher();
</script>

<div class="deleteModal">
	<Modal
		danger
		bind:open
		size="sm"
		modalHeading="Do you want to delete this {name} record?"
		primaryButtonText="Delete"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:close
		on:submit={() => dispatch('deleteConfirm')}
	>
		<p class="t-text-[#da1e28] t-px-5 t-pt-3 t-text-sm t-font-light">{textContent}</p>
	</Modal>
</div>
