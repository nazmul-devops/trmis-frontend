<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { createBatchParticipant, updateBatchParticipant } from '$lib/service/batch-participants';
	import { trainees } from '$lib/store/trainee';
	import { createEventDispatcher } from 'svelte';
	import { Modal, TextInput, Select, SelectItem } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let open = true;
	export let participant = {
		trainee: null
	};

	$: {
		setFields('trainee', participant.trainee);
	}

	const schema = yup.object({
		trainee: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				trainee: parseInt(values.trainee)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (participant.trainee) {
				await updateBatchParticipant($page.params.batchId, { ...data, id: participant.trainee });
			} else {
				await createBatchParticipant($page.params.batchId, { ...data });
			}
			open = false;
			reset();
			dispatch('update-list');
		}
	});

	onMount(async () => {
		trainees.getTrainees();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Participant"
	primaryButtonText={participant.trainee == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<Select invalid={$errors.participant != null} name="trainee" labelText="Participant">
			<SelectItem text="choose Participant" value="" />
			{#each $trainees.data as item}
				<SelectItem text={item.name} value={item.phone} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p>
		<p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
