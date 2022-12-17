<script lang="ts">
	import { page } from '$app/stores';
	import Form from '../Form.svelte';

	function create(event) {
		console.log('create', event.detail);
	}
</script>

<h1>{JSON.stringify($page.params)}</h1>
<Form formType={'create'} on:create={create} />
