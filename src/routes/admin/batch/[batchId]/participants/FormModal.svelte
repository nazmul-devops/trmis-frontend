<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { batchParticipantsList } from '$lib/store/batch-participants';
	import { trainees } from '$lib/store/trainee';
	import { Modal, TextInput, Select, SelectItem, ComboBox } from 'carbon-components-svelte';
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
		trainee: yup.number().required().typeError("Participant is required")
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

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await batchParticipantsList.createBatchParticipant(parseInt($page.params.batchId), {
				...data
			});
			open = false;
			reset();
		}
	});

	$: traineesList = $trainees.data.map((item) =>({...item,  text:item.name}))

	onMount(async () => {
		trainees.getTrainees();
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
		<ComboBox 
			invalid={$errors.trainee != null}
			invalidText={$errors.trainee}
			name="trainee"
			titleText="Participant"
			placeholder="Choose Participant"
			bind:selectedId={$data.trainee}
			items={traineesList}
		/>
		<!-- <Select invalid={$errors.participant != null} name="trainee" labelText="Participant">
			<SelectItem text="choose Participant" value="" />
			{#each $trainees.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select> -->

		<!-- <p>{JSON.stringify($errors)}</p> -->
		<!-- <p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
