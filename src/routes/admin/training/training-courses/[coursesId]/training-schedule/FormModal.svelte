<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingSchedules } from '$lib/store/trainingSchedule';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { trainingCenters } from '$lib/store/trainingCenter';
	import {
		Modal,
		DatePickerInput,
		TextInput,
		Select,
		SelectItem,
		DatePicker,
		ComboBox
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let schedule = {
		id: null,
		training_course: null,
		training_center: null,
		start_date: null,
		status: null,
		end_date: null
	};

	function formSetFields() {}

	$: {
		if (schedule.id != null) {
			setData('training_course', schedule.training_course);
			setData('training_center', schedule.training_center);
			setData('start_date', schedule.start_date);
			setData('status', schedule.status);
			setData('end_date', schedule.end_date);
		} else {
			reset();
		}
	}

	const schema = yup.object({
		training_course: yup.number().required("Training course is required."),
		training_center: yup.number().required("Training center is required."),
		status: yup.number().required("Status is required."),
		start_date: yup.string().required(),
		end_date: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setData, setFields, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			if (schedule.id) {
				await trainingSchedules.updateTrainingSchedule({ ...data, id: schedule.id });
			} else {
				await trainingSchedules.createTrainingSchedule({ ...data });
			}
			open = false;
			reset();
		}
	});

	$: trainingCourseList = $trainingCourses.data.map((item) => ({ ...item, text: item.title }));
	$: trainingCenterList = $trainingCenters.data.map((item) => ({ ...item, text: item.name }));

	onMount(async () => {
		trainingSchedules.getTrainingSchedules();
		trainingCourses.getTrainingCourses();
		trainingCenters.getTrainingCenters();
	});
</script>

<Modal
	bind:open
	modalHeading={schedule.id == null ? 'Create Training Schedule' : 'Edit Trining Schedule'}
	primaryButtonText={schedule.id == null ? 'Create' : 'Edit'}
	preventCloseOnClickOutside
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<div class="t-grid t-grid-cols-2 t-gap-4">
			<div>
				<ComboBox
				bind:selectedId={$data.training_course}
				titleText="Training Course"
				placeholder="Select Training Course"
				items={trainingCourseList}
			/>
			{#if $errors.training_course}
				<p class="t-text-red-500">{$errors.training_course}</p>
			{/if}
			</div>
			<div>
				<ComboBox
				name="training_center"
				bind:selectedId={$data.training_center}
				titleText="Training Venue"
				placeholder="Select Training Venue"
				items={trainingCenterList}
			/>
			{#if $errors.training_center}
				<p class="t-text-red-500">{$errors.training_center}</p>
			{/if}
			</div>
			<div>
				<ComboBox
				name="status"
				invalid={$errors.status != null}
				bind:selectedId={$data.status}
				titleText="Status"
				placeholder="Select Status"
				items={[
					{ id: 1, text: 'Pending' },
					{ id: 2, text: 'Approved' },
					{ id: 3, text: 'Rejected' }
				]}
			/>
			{#if $errors.status}
				<p class="t-text-red-500">{$errors.status}</p>
			{/if}
			</div>
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
			</div>
		</div>
	</form>
	<!-- {JSON.stringify($data)} -->
	<!-- {JSON.stringify($errors)} -->
</Modal>
