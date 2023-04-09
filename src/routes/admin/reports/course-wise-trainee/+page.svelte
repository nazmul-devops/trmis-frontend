<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { getReports } from '$lib/service/report';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { REPORT_TYPE } from '$lib/constants';

	let course_id;

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		course_id: yup.number(),
		start_date: yup.string(),
		end_date: yup.string()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			await getReports({
				...data,
				course_id,
				report_type: REPORT_TYPE.COURSE.id,
				fileName: REPORT_TYPE.COURSE.name
			});
		}
	});

	$: {
		setData('designation_id', course_id);
	}

	$: Courses = $trainingCourses.data.map((item) => ({ ...item, text: item.title }));

	onMount(() => {
		trainingCourses.getTrainingCourses();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Training Wise Participants Report</h4>
	</div>
	<div class="t-flex t-gap-4 t-items-end   ">
		<div>
			<ComboBox
				bind:selectedId={course_id}
				titleText="Training"
				placeholder="Select Training"
				items={Courses}
				{shouldFilterItem}
			/>
		</div>
		<div class="custom">
			<DatePicker datePickerType="single" name="start_date" on:change>
				<DatePickerInput class="t-w-full" labelText="Start date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div class="custom">
			<DatePicker datePickerType="single" name="end_date" on:change>
				<DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div class="">
			<Button on:click={submitHandler} class='t-rounded-lg'>Generate</Button>
		</div>
	</div>
</div>
