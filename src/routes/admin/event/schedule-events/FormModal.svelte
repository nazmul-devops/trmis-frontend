<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCenters } from '$lib/store/trainingCenter';
	import {
		Modal,
		Select,
		SelectItem,
		DatePicker,
		DatePickerInput,
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { scheduleEventsLists } from '$lib/store/schedule-events';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

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
		start_date: yup.string().required("Start date is required."),
		end_date: yup.string().required("End date is required."),
		event_venue: yup.number().required().typeError("Event venue is required.")
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

	$: scheduleEventsList = $scheduleEventsLists.data.map((item) => ({
		...item,
		text: item.event_venue_name
	}));

	onMount(async () => {
		trainingCenters.getTrainingCenters();
		scheduleEventsLists.getEventSchedules();
	});
</script>

<Modal
	bind:open
	modalHeading={eventSchedule.id == null ? 'Create Schedule' : 'Edit Schedule'}
	primaryButtonText={eventSchedule.id == null ? 'ADD' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div class="custom">
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
				{#if $errors.start_date}
					<p class="t-text-red-500">{$errors.start_date}</p>
				{/if}
			</div>
			<div class="custom">
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
				{#if $errors.end_date}
					<p class="t-text-red-500">{$errors.end_date}</p>
				{/if}
			</div>

			<div>
				<ComboBox
					invalid={$errors.event_venue != null}
					direction="bottom"
					bind:selectedId={$data.event_venue}
					titleText="Event Venue"
					placeholder="Choose Venue"
					items={scheduleEventsList}
					{shouldFilterItem}
				/>
				{#if $errors.event_venue}
					<p class="t-text-red-500">{$errors.event_venue}</p>
				{/if}
			</div>
			<!-- <p>{JSON.stringify($errors)}</p> -->
			<!-- <p>{JSON.stringify($data)}</p> -->
		</div>
	</form>
</Modal>
