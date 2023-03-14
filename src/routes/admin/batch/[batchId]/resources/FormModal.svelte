<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createBatchParticipant } from '$lib/service/batch-participants';
	import { trainers } from '$lib/store/trainer';
	import { createEventDispatcher } from 'svelte';
	import { Modal, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createBatchResource } from '$lib/service/batch-resources';
	export let open = true;
	export let resource = {
		trainer: null
	};

	$: {
		setFields('trainer', resource.trainer);
	}

	const schema = yup.object({
		trainer: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				trainer: parseInt(values.trainer)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await createBatchResource($page.params.batchId, { ...data });
			open = false;
			reset();
			dispatch('update-list');
		}
	});

	onMount(async () => {
		trainers.getTrainers();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Participant"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<Select invalid={$errors.resource != null} name="trainer" labelText="Resources">
			<SelectItem text="choose Resources" value="" />
			{#each $trainers.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p>
		<p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
