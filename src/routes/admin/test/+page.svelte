<script lang="ts">
	import axios from 'axios';
	import { DataTable, TextInput, Button } from 'carbon-components-svelte';
	let trainee: any;
	let traineeLast: any;
	let trainees = [
		{
			id: 4,
			name: 'jack',
			lastname: 'pot'
		}
	];

	function add() {
		trainees = [...trainees, { id: trainees.length + 1, name: trainee, lastname: traineeLast }];
		trainee = '';
	}

	function save() {
		axios.post('https://jsonplaceholder.typicode.com/posts', trainees);
	}
</script>

<DataTable
	headers={[
		{ key: 'name', value: 'Name' },
		{ key: 'lastname', value: 'Last name' }
	]}
	rows={trainees}
/>

<TextInput bind:value={trainee} />
<TextInput bind:value={traineeLast} />
<Button on:click={() => add()}>Add</Button>
<Button on:click={() => save()}>Save</Button>
