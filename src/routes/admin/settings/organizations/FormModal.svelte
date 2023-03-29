<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { organizations } from '$lib/store/organization';
	import { Modal, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let organization = {
		id: null,
		name: null,
	};

	$: {
		if (organization.id != null) {
			setFields('name', organization.name);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		name: yup.string().required().typeError('Name is required.'),
	});

	const { form, reset, createSubmitHandler, setFields, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (organization.id) {
				await organizations.updateOrganization({ ...data, id: organization.id });
			} else {
				await organizations.createOrganization({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		organizations.getOrganizations();
	});
</script>

<Modal
	bind:open
	size="xs"
	modalHeading={organization.id == null ? 'Create Organizations' : 'Edit Organizations'}
	primaryButtonText={organization.id == null ? 'Create' : 'Edit'}
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
					labelText="name"
					placeholder="Enter  name..."
				/>
				{#if $errors.name}
					<p class="t-text-red-500">{$errors.name}</p>
				{/if}
			</div>
		</div>
	</form>
</Modal>
