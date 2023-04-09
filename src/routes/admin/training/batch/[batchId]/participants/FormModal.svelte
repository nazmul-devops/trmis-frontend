<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { batchParticipantsList } from '$lib/store/batch-participants';
	import { trainees } from '$lib/store/trainee';
	import { Modal, ComboBox, NumberInput, TextInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let errorModal = false;
	export let open = true;

	const schema = yup.object({
		trainee: yup.number().required('Trainee is required.'),
		pre_test_mark: yup.number().nullable(),
		post_test_mark: yup.number().nullable()
	});

	const { form, reset, createSubmitHandler, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await batchParticipantsList.createBatchParticipant(parseInt($page.params.batchId), {
				...data
			});
			open = false;
			reset();
			if ($batchParticipantsList.errorData.status == 403) {
				errorModal = true;
			}
		}
	});

	$: traineesList = $trainees.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		trainees.getTrainees();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Participant"
	primaryButtonText="ADD"
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<ComboBox
					bind:selectedId={$data.trainee}
					invalid={$errors.trainee != null}
					titleText="Participant"
					placeholder="Choose Participant"
					items={traineesList}
					{shouldFilterItem}
				/>
				{#if $errors.trainee}
					<p class="t-text-red-500">{$errors.trainee}</p>
				{/if}
			</div>
			<div>
				<TextInput
					type="number"
					bind:value={$data.pre_test_mark}
					labelText=" Pre Test Mark"
					placeholder="Enter Pre test Mark"
				/>
			</div>
			<div>
				<TextInput
					type="number"
					bind:value={$data.post_test_mark}
					labelText=" Post Test Mark"
					placeholder="Enter Post test Mark"
				/>
			</div>
			<!-- <p>{JSON.stringify($errors)}</p> -->
			<!-- <p>{JSON.stringify($data)}</p> -->
		</div>
	</form>
</Modal>

<Modal passiveModal bind:open={errorModal} modalHeading="" on:open on:close>
	<p class=" t-text-red-500 t-text-lg ">{$batchParticipantsList.errorData.errorMessage}</p>
</Modal>
