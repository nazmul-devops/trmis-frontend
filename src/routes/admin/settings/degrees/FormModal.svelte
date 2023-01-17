<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { degrees } from '$lib/store/degrees';
	import { TextInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	const schema = yup.object({
		name: yup.string().required()
	});

	export let degree = {
		id: null,
		name: null
	};

	$: {
		setFields('name', degree.name);
	}

	const { form, reset, setFields } = createForm({
		extend: validator({ schema }),
		async onSubmit(value) {
			if (degree.id) {
				await degrees.updateDegree({ ...value, id: degree.id });
			} else {
				await degrees.createDegree({ ...value });
			}
			reset();
		}
	});

	onMount(async () => {
		await degrees.getDegrees();
	});
</script>

<div>
	<form use:form>
		<TextInput name="name" labelText=" name" placeholder="Enter  name..." />
		<Button type="submit">submit</Button>
	</form>
</div>
