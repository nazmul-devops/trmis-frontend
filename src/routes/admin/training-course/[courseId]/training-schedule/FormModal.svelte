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
		training_course: yup.number().required(),
		training_center: yup.number().required(),
		status: yup.number().required(),
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
	secondaryButtonText="Cancel"
	on:click:button--secondary={() => (open = false)}
	on:submit={submitHandler}
>
	<form use:form>
		<ComboBox
			invalid={$errors.training_course}
			bind:selectedId={$data.training_course}
			placeholder="Select Training Course"
			items={trainingCourseList}
		/>
		<!-- <Select
			invalid={$errors.training_course != null}
			name="training_course"
			labelText="Training Course"
		>
			<SelectItem text="choose course" />
			{#each $trainingCourses.data as Course}
				<SelectItem value={Course.id} text={Course.title} />
			{/each}
		</Select> -->
		<ComboBox
			name="training_center"
			bind:selectedId={$data.training_center}
			titleText="Training Center"
			placeholder="Select Training Center"
			items={trainingCenterList}
		/>
		<!-- <Select
			invalid={$errors.training_center != null}
			name="training_center"
			labelText="Training Center"
		>
			<SelectItem text="choose Center" />
			{#each $trainingCenters.data as center}
				<SelectItem value={center.id} text={center.name} />
			{/each}
		</Select> -->
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
		<!-- <Select invalid={$errors.status != null} name="status" labelText="Status">
			<SelectItem text="choose Status" />
			<SelectItem text="Pending" value="1" />
			<SelectItem text="Approved" value="2" />
			<SelectItem text="Rejected" value="3" />
		</Select> -->
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
	<!-- {JSON.stringify($data)} -->
	<!-- {JSON.stringify($errors)} -->
</Modal>
