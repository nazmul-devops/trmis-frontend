<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCenters } from '$lib/store/trainingCenter';
	import { Modal, Select, SelectItem, DatePicker, DatePickerInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { scheduleEventsLists } from "$lib/store/schedule-events"
	export let open = true;
	export let eventSchedule = {
		id: null,
		start_date: null,
		end_date: null,
		event_venue: null
	};

	function formDetails() {
		setFields('start_date', eventSchedule.start_date);
		setFields('end_date', eventSchedule.end_date);
		setFields('event_venue', eventSchedule.event_venue);
	}

	$: {
		if (eventSchedule.id != null) {
			formDetails();
		} else {
			reset();
		}
	}

	const schema = yup.object({
		start_date: yup.string().required(),
		end_date: yup.string().required(),
		event_venue: yup.number().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				event_venue: parseInt(values.event_venue)
			};
		},
		extend: validator({ schema })
	});


	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (eventSchedule.id) {
				await scheduleEventsLists.updateEventSchedule({ ...data, id: eventSchedule.id });
			} else {
				await scheduleEventsLists.createEventSchedule({ ...data });
			}
			open = false;
			reset();
		}
	});

	onMount(async () => {
		trainingCenters.getTrainingCenters();
		scheduleEventsLists.getEventSchedules()
	});
</script>

<Modal
	bind:open
	modalHeading="Create Schedule"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<DatePicker
			bind:value={$data.start_date}
			name="start_date"
			dateFormat="Y-m-d"
			datePickerType="single"
			on:change
		>
			<DatePickerInput
				invalid={$errors.start_date != null}
				labelText="Start Date"
				placeholder="YYYY-mm-dd"
			/>
		</DatePicker>
		<DatePicker
			bind:value={$data.end_date}
			name="end_date"
			dateFormat="Y-m-d"
			datePickerType="single"
			on:change
		>
			<DatePickerInput
				invalid={$errors.end_date != null}
				labelText="End Date"
				placeholder="YYYY-mm-dd"
			/>
		</DatePicker>
		<Select invalid={$errors.event_venue != null} name="event_venue" labelText="Event Venue">
			<SelectItem text="choose Venue" value="" />
			{#each $trainingCenters.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p> -->
		<!-- <p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
