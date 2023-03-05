<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { designations } from '$lib/store/designations';
	import { getReports } from '$lib/service/report';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { REPORT_TYPE } from '$lib/constants';

	let designation_id;

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		designation_id: yup.number(),
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
				designation_id,
				report_type: REPORT_TYPE.DESIGNATION.id,
				fileName: REPORT_TYPE.DESIGNATION.name
			});
		}
	});

	$: {
		setData('designation_id', designation_id);
	}

	$: Designations = $designations.data.map((item) => ({ ...item, text: item.name }));

	onMount(() => {
		designations.getDesignations();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Designations Wise Trainee Report</h4>
	</div>
	<div class="t-flex t-gap-4 t-items-center   ">
		<div>
			<ComboBox
				bind:selectedId={designation_id}
				titleText="Designations"
				placeholder="Select Designations	"
				items={Designations}
				{shouldFilterItem}
			/>
		</div>
		<div>
			<DatePicker datePickerType="single" name="start_date" on:change>
				<DatePickerInput class="t-w-full" labelText="Start date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div>
			<DatePicker datePickerType="single" name="end_date" on:change>
				<DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div class="">
			<Button on:click={submitHandler}>Generate</Button>
		</div>
	</div>
</div>
