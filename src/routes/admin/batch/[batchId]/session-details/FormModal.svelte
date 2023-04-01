<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainers } from '$lib/store/trainer';
	import { courseTopics } from '$lib/store/courseTopic';
	import { getBatches } from '$lib/service/batch';
	import { createEventDispatcher } from 'svelte';
	import {
		Modal,
		TextInput,
		Select,
		SelectItem,
		DatePicker,
		DatePickerInput,
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createBatchSession, updateBatchSession } from '$lib/service/batch-sessions-detail';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let open = true;
	export let sessionDetail = {
		id: null,
		session_day: null,
		session_date: null,
		session_no: null,
		from_time: null,
		to_time: null,
		trainer: null,
		topic: null
	};

	function formDetails() {
		setFields('session_day', sessionDetail.session_day);
		setFields('session_date', sessionDetail.session_date);
		setFields('session_no', sessionDetail.session_no);
		setFields('from_time', sessionDetail.from_time);
		setFields('to_time', sessionDetail.to_time);
		setFields('trainer', sessionDetail.trainer);
		setFields('topic', sessionDetail.topic);
	}

	$: {
		if (sessionDetail.id != null) {
			formDetails();
		} else {
			reset();
		}
	}

	const schema = yup.object({
		session_day: yup.string().required("Session day is required."),
		session_date: yup.string().required(),
		session_no: yup.number().required("Session No is required"),
		from_time: yup.string().required("Start time is required."),
		to_time: yup.string().required("End time is required."),
		trainer: yup.number().required().typeError("Trainer is required."),
		topic: yup.number().required().typeError("Topic is required.")
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				session_no: values.session_no ? parseInt(values.session_no) : null,
				trainer: parseInt(values.trainer),
				topic: parseInt(values.topic)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (sessionDetail.id) {
				await updateBatchSession($page.params.batchId, { ...data, id: sessionDetail.id });
			} else {
				await createBatchSession($page.params.batchId, { ...data });
			}
			open = false;
			dispatch('update-list');
			reset();
		}
	});

	$: trainer = $trainers.data.map((item) => ({ ...item, text: item.name }));
	$: courseTopic = $courseTopics.data.map((item) => ({ ...item, text: item.title }));

	onMount(async () => {
		trainers.getTrainers();
		courseTopics.getCourseTopics();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Session Details"
	primaryButtonText="ADD"
	secondaryButtonText="Cancel"
	preventCloseOnClickOutside
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<div class="t-col-span-2">
					<TextInput
						invalid={$errors.session_day != null}
						bind:value={$data.session_day}
						name="session_day"
						labelText="Session Day Number"
						placeholder="Enter Session Day..."
					/>
					{#if $errors.session_day}
						<p class="t-text-red-500">{$errors.session_day}</p>
					{/if}
				</div>
			</div>

			<div class="custom">
				<DatePicker
					bind:value={$data.session_date}
					name="session_date"
					dateFormat="Y-m-d"
					datePickerType="single"
					on:change
				>
					<DatePickerInput
						invalid={$errors.session_date != null}
						labelText="Session Date"
						placeholder="YYYY-mm-dd"
					/>
				</DatePicker>
			</div>

			<div>
				<TextInput
					invalid={$errors.session_no != null}
					bind:value={$data.session_no}
					name="session_no"
					labelText="Session No"
					placeholder="Enter Session No..."
				/>
				{#if $errors.session_no}
					<p class="t-text-red-500">{$errors.session_no}</p>
				{/if}
			</div>

			<div class=" t-border t-flex t-flex-col t-w-full">
				<label for="" class="t-text-[#525252] t-text-xs">Start Time</label>
				<input
					type="time"
					name="from_time"
					bind:value={$data.from_time}
					class="t-border-[1px] t-mt-2 t-border-[#525252] t-text-[#525252] t-rounded-lg t-px-6 t-py-2"
				/>
				{#if $errors.from_time}
					<p class="t-text-red-500 t-my-1">{$errors.from_time}</p>
				{/if}
			</div>
			<div class=" t-border t-flex t-flex-col t-w-full">
				<label for="" class="t-text-[#525252] t-text-xs">End Time</label>
				<input
					type="time"
					name="to_time"
					bind:value={$data.to_time}
					class="t-border-[1px] t-w-full t-mt-3 t-border-[#525252] t-text-[#525252] t-rounded-lg t-px-6 t-py-2"
				/>
				{#if $errors.to_time}
					<p class="t-text-red-500 t-my-1">{$errors.to_time}</p>
				{/if}
			</div>

			<div>
				<ComboBox
					invalid={$errors.trainers != null}
					direction="top"
					bind:selectedId={$data.trainer}
					titleText="Trainer"
					placeholder="Choose Trainer"
					items={trainer}
					{shouldFilterItem}
				/>
				{#if $errors.trainers}
					<p class="t-text-red-500">{$errors.trainers}</p>
				{/if}
			</div>
			<div>
				<ComboBox
					invalid={$errors.topic != null}
					direction="top"
					bind:selectedId={$data.topic}
					titleText="Topic"
					placeholder="Choose Topic"
					items={courseTopic}
					{shouldFilterItem}
				/>
				{#if $errors.topic}
					<p class="t-text-red-500">{$errors.topic}</p>
				{/if}
			</div>
			<!-- <p>{JSON.stringify($errors)}</p> -->
			<!-- <p>{JSON.stringify($data)}</p> -->
		</div>
	</form>
</Modal>
