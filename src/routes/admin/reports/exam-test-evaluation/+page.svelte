<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { REPORT_TYPE } from '$lib/constants';
	import { getReports } from '$lib/service/report';
	import { getLocations } from '$lib/service/locations';
	import { getBatches } from '$lib/service/batch';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let division_id;
	let district_id;
	let sub_district_id;
	let batch_id;
	let Course_id;

	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];
	let Batches = [];

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		division_id: yup.number(),
		district_id: yup.number(),
		sub_district_id: yup.number(),
		batch_id: yup.number(),
		Course_id: yup.number()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			// console.log('OK -> ', data);
			await getReports({
				...data,
				division_id,
				district_id,
				sub_district_id,
				batch_id,
				Course_id,
				report_type: REPORT_TYPE.EXAM_TEST.id,
				fileName: REPORT_TYPE.EXAM_TEST.name
			});
		}
	});

	$: {
		getLocations().then((resp) => {
			locations = resp.data;
		});
	}

	$: {
		getBatches().then((resp) => {
			Batches = resp.data;
		});
	}

	$: {
		if (district_id) {
			let index = zilaOptions.findIndex((item) => item.id === district_id);
			upazilaOptions = zilaOptions[index]?.upazilas;
		} else {
			upazilaOptions = [];
			sub_district_id = null;
		}
	}

	$: {
		if (division_id) {
			let index = locations.findIndex((item) => item.id === division_id);
			zilaOptions = locations[index]?.zilas;
		} else {
			zilaOptions = [];
			district_id = null;
		}
	}

	$: Course = $trainingCourses.data.map((item) => ({ ...item, text: item.title }));
	$: Batch = Batches.map((item) => ({ ...item, text: item.name }));

	onMount(() => {
		trainingCourses.getTrainingCourses();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Training Name List</h4>
	</div>
	<div class="t-flex t-gap-4 t-items-end   ">
		<ComboBox
			bind:selectedId={division_id}
			titleText="Division"
			placeholder="Select Division"
			items={locations}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!division_id}
			bind:selectedId={district_id}
			titleText="Training District"
			placeholder="Select District"
			items={zilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!district_id}
			bind:selectedId={sub_district_id}
			titleText="Training Sub-District"
			placeholder="Select Sub District"
			items={upazilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			bind:selectedId={Course_id}
			titleText="Training"
			placeholder="Select Training"
			items={Course}
			{shouldFilterItem}
		/>
		<ComboBox
			bind:selectedId={batch_id}
			titleText="Batch"
			placeholder="Select Batch"
			items={Batch}
			{shouldFilterItem}
		/>
		<div class="">
			<Button on:click={submitHandler} class='t-rounded-lg'>Generate</Button>
		</div>
	</div>
</div>
