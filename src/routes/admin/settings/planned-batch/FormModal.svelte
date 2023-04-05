<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { plannedBatches } from '$lib/store/planned';
	import { TextInput, DatePicker, DatePickerInput, Modal } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let planned = {
		id: null,
		year: null,
		no_of_batch: null
	};

	export let open = true;

	$: {
		setData('year', planned.year);
		setData('no_of_batch', planned.no_of_batch);
	}
	const schema = yup.object({
		year: yup.string().required('Year is required.'),
		no_of_batch: yup.number().required().typeError('No of Batch is required.')
	});

	const { form, reset, setData, data, createSubmitHandler, errors } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (planned.id) {
				await plannedBatches.updatePlannedBatch({ ...data, id: planned.id });
			} else {
				await plannedBatches.createPlannedBatch({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		await plannedBatches.getPlannedBatches();
	});
</script>

<Modal
	bind:open
	modalHeading={planned.id == null ? 'Create Planned' : 'Edit Planned'}
	primaryButtonText={planned.id == null ? 'Create' : 'Edit'}
	size="sm"
	secondaryButtonText="Cancel"
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="custom t-grid t-grid-cols-2 t-gap-4">
			<div>
				<DatePicker datePickerType="single" bind:value={$data.year} dateFormat="Y" on:change>
					<DatePickerInput
						labelText="Year"
						invalid={$errors.year != null}
						placeholder="mm/dd/yyyy"
					/>
				</DatePicker>
				{#if $errors.year}
					<p class="t-text-red-500">{$errors.year}</p>
				{/if}
			</div>
			<div>
				<TextInput
					type="number"
					bind:value={$data.no_of_batch}
					invalid={$errors.no_of_batch != null}
					name="no_of_batch"
					labelText=" No Of batch"
					placeholder="Enter No Of Batch..."
				/>
				{#if $errors.no_of_batch}
					<p class="t-text-red-500">{$errors.no_of_batch}</p>
				{/if}
			</div>
		</div>
	</form>
</Modal>
