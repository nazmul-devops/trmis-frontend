<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { getLocations } from '$lib/service/locations';
	import { getReports } from '$lib/service/report';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { REPORT_TYPE } from '$lib/constants';

	let division_id;
	let district_id;
	let sub_district_id;

	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		division_id: yup.number(),
		district_id: yup.number(),
		sub_district_id: yup.number()
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
				report_type: REPORT_TYPE.SCHEDULE.id,
				fileName: REPORT_TYPE.SCHEDULE.name
			});
		}
	});

	$: {
		getLocations().then((resp) => {
			locations = resp.data;
		});
	}

	$: {
		setData('division_id', division_id);
		setData('district_id', district_id);
		setData('sub_district_id', sub_district_id);
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
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Trainee Schedule Report</h4>
	</div>
	<form use:form>
		<div class="t-flex t-gap-4 t-items-end">
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
	</form>
</div>
