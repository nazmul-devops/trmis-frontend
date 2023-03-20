<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { batchParticipantsList } from '$lib/store/batch-participants';
	import { trainees } from '$lib/store/trainee';
	import { Modal, ComboBox } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let open = true;
	export let participant = {
		trainee: null
	};

	const schema = yup.object({
		trainee: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
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

	$: traineesList = $trainees.data.map((item) => ({ ...item, text: item.name }));

	$: {
		console.log(traineesList);
	}

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
			bind:selectedId={$data.trainee}
			invalid={$errors.trainee != null}
			invalidText={$errors.trainee}
			titleText="Participant"
			placeholder="Choose Participant"
			items={traineesList}
			{shouldFilterItem}
		/>
		<!-- <Select invalid={$errors.participant != null} name="trainee" labelText="Participant">
			<SelectItem text="choose Participant" value="" />
			{#each $trainees.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select> -->

		<!-- <p>{JSON.stringify($errors)}</p> -->
		<p>{JSON.stringify($data)}</p>
	</form>
</Modal>
