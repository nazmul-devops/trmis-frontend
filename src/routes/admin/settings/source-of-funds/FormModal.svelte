<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import { Modal, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let sourceOfFound = {
		id: null,
		name: null,
	
	};

	$: {
		if (sourceOfFound.id) {
			setFields('name', sourceOfFound.name);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required().typeError('Name is required'),
	});

	const { form, touched, reset, errors, createSubmitHandler, setFields } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (sourceOfFound.id) {
				await sourceOfFounds.updateSourceOfFund({ ...data, id: sourceOfFound.id });
			} else {
				await sourceOfFounds.createSourceOfFund({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		sourceOfFounds.getSourceOfFounds();
	});
</script>

<Modal
	bind:open
	size="xs"
	modalHeading={sourceOfFound.id == null ? 'Create Source Of Fund' : 'Edit Source Of Fund'}
	primaryButtonText={sourceOfFound.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-1 t-gap-4">
			<div>
				<TextInput
					invalid={$errors.name != null}
					name="name"
					labelText=" name"
					placeholder="Enter  name..."
				/>
				{#if $errors.name}
					<p class="t-text-red-500">{$errors.name}</p>
				{/if}
			</div>
		</div>
		<!-- {JSON.stringify($touched)} -->
	</form>
</Modal>
