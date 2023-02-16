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
		DatePicker
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	export let open = true;
	export let schedule = {
		id: null,
		training_course: null,
		training_center: null,
		start_date: null,
		end_date: null
	};

	function formSetFields() {
		setFields('training_course', schedule.training_course);
		setFields('training_center', schedule.training_center);
		setFields('start_date', schedule.start_date);
		setFields('end_date', schedule.end_date);
	}

	$: {
		if (schedule.id != null) {
			formSetFields();
		}
	}

	const schema = yup.object({
		training_course: yup.number().required(),
		training_center: yup.number().required(),
		start_date: yup.string().required(),
		end_date: yup.string().required()
	});

	const { form, reset, createSubmitHandler, setFields, errors, data } = createForm({
		transform: (values: any) => {
			return {
				...values,
				training_course: parseInt(values.training_course),
				training_center: parseInt(values.training_center)
			};
		},
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

	onMount(async () => {
		trainingSchedules.getTrainingSchedules();
		trainingCourses.getTrainingCourses();
		trainingCenters.getTrainingCenters();
	});
</script>

<Modal
	bind:open
	modalHeading="Create Training Schedule"
	primaryButtonText={schedule.id == null ? 'Create' : 'Edit'}
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<Select
			invalid={$errors.training_course != null}
			name="training_course"
			labelText="Training Course"
		>
			<SelectItem text="choose course" />
			{#each $trainingCourses.data as Course}
				<SelectItem value={Course.id} text={Course.title} />
			{/each}
		</Select>
		<Select
			invalid={$errors.training_center != null}
			name="training_center"
			labelText="Training Center"
		>
			<SelectItem text="choose Center" />
			{#each $trainingCenters.data as center}
				<SelectItem value={center.id} text={center.name} />
			{/each}
		</Select>
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

		<!-- <p>{JSON.stringify($errors)}</p> -->
	</form>
</Modal>
