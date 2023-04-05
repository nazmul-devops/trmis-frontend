<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainers } from '$lib/store/trainer';
	import { createEventDispatcher } from 'svelte';
	import {
		Modal,
		TextInput,
		DatePicker,
		DatePickerInput,
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { batchSession } from '$lib/store/batch-sessions-detail';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	export let errorModal = false;
	export let open = true;
	export let sessionDetail = {
		id: null,
		session_day: null,
		session_date: null,
		from_time: null,
		to_time: null,
		trainer: null,
		topic: null
	};

	function formDetails() {
		setFields('session_day', sessionDetail.session_day);
		setFields('session_date', sessionDetail.session_date);
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
		session_day: yup.string().required('Session day is required.'),
		session_date: yup.string().required(),
		from_time: yup.string().required('Start time is required.'),
		to_time: yup.string().required('End time is required.'),
		trainer: yup.number().required().typeError('Trainer is required.'),
		topic: yup.string().required().typeError('Topic is required.')
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				session_no: values.session_no ? parseInt(values.session_no) : null,
				trainer: parseInt(values.trainer)
			};
		},
		extend: validator({ schema })
	});

	const dispatch = createEventDispatcher();

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (sessionDetail.id) {
				await batchSession.updateBatchSession(parseInt($page.params.batchId), {
					...data,
					id: sessionDetail.id
				});
			} else {
				await batchSession.createBatchSession(parseInt($page.params.batchId), { ...data });
			}
			open = false;
			dispatch('update-list');
			reset();
			if ($batchSession.errorData.status == 403) {
				errorModal = true;
			}
		}
	});

	$: trainer = $trainers.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		trainers.getTrainers();
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
					titleText="Resource Person"
					placeholder="Choose Resource Person"
					items={trainer}
					{shouldFilterItem}
				/>
				{#if $errors.trainers}
					<p class="t-text-red-500">{$errors.trainers}</p>
				{/if}
			</div>
			<div>
				<TextInput
					invalid={$errors.topic != null}
					name="topic"
					labelText="Topic"
					placeholder="Enter Topic"
				/>
				{#if $errors.topic}
					<p class="t-text-red-500">{$errors.topic}</p>
				{/if}
				<!-- <ComboBox
					invalid={$errors.topic != null}
					direction="top"
					bind:selectedId={$data.topic}
					titleText="Topic"
					placeholder="Choose Topic"
					items={courseTopic}
					{shouldFilterItem}
				/>
				-->
			</div>
			<!-- <p>{JSON.stringify($errors)}</p> -->
			<!-- <p>{JSON.stringify($data)}</p> -->
		</div>
	</form>
</Modal>

<Modal passiveModal bind:open={errorModal} modalHeading="" on:open on:close>
	<p class=" t-text-red-500 t-text-lg ">{$batchSession.errorData.errorMessage}</p>
</Modal>
