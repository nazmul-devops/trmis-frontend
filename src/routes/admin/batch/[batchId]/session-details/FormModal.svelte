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
		DatePickerInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { createBatchSession, updateBatchSession } from '$lib/service/batch-sessions-detail';
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
		session_day: yup.string().required(),
		session_date: yup.string().required(),
		session_no: yup.number().required(),
		from_time: yup.string().required(),
		to_time: yup.string().required(),
		trainer: yup.number().required(),
		topic: yup.number().required()
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
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<TextInput
			invalid={$errors.name != null}
			name="session_day"
			labelText="Session Day Number"
			placeholder="Enter Session Day..."
		/>

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

		<TextInput
			invalid={$errors.session_no != null}
			name="session_no"
			labelText="Session NO"
			placeholder="Enter Session No..."
		/>

		<div class=" t-p-3 t-border ">
			<label for="">Start Time</label>
			<input type="time" name="from_time" />
		</div>
		<div class="t-p-3 t-border">
			<label for="">End Time</label>
			<input type="time" name="to_time" />
		</div>

		<Select invalid={$errors.trainer != null} name="trainer" labelText="Trainer">
			<SelectItem text="choose Trainer" value="" />
			{#each $trainers.data as item}
				<SelectItem text={item.name} value={item.id} />
			{/each}
		</Select>
		<Select invalid={$errors.topic != null} name="topic" labelText="Topic">
			<SelectItem text="choose Topic" value="" />
			{#each $courseTopics.data as item}
				<SelectItem text={item.title} value={item.id} />
			{/each}
		</Select>

		<!-- <p>{JSON.stringify($errors)}</p> -->
		<!-- <p>{JSON.stringify($data)}</p> -->
	</form>
</Modal>
