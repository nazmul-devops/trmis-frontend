<script>
	import { Button } from 'carbon-components-svelte';
	import FormModal from './FormModal.svelte';
	let open = false;
	let user;
	function openModalForm() {
		open = true;
	}
</script>

<div>
	<div />
	<Button on:click={() => openModalForm()}>Edit Password</Button>
	<FormModal bind:open />
</div>
