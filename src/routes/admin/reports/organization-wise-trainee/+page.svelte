<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { organizations } from '$lib/store/organization';
	import { getReports } from '$lib/service/report';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { REPORT_TYPE } from '$lib/constants';

	let organization_id;

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	const schema = yup.object({
		organization_id: yup.number(),
		start_date: yup.string(),
		end_date: yup.string()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			// console.log('OK -> ', data);
			await getReports({
				...data,
				organization_id,
				report_type: REPORT_TYPE.ORGANIZATION.id,
				fileName: REPORT_TYPE.ORGANIZATION.name
			});
		}
	});

	$: organizaionts = $organizations.data.map((item) => ({ ...item, text: item.name }));

	$: {
		setData('organization_id', organization_id);
	}

	onMount(() => {
		organizations.getOrganizations();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Organization Wise Trainee Report</h4>
	</div>
	<form use:form>
		<div class="t-flex t-gap-4 t-items-center">
			<div>
				<ComboBox
					bind:selectedId={organization_id}
					titleText="Organizations"
					placeholder="Select Organizations"
					items={organizaionts}
					{shouldFilterItem}
				/>
			</div>
			<div>
				<DatePicker datePickerType="single">
					<DatePickerInput
						name="start_date"
						class="t-w-full"
						labelText="Start date"
						placeholder="mm/dd/yyyy"
					/>
				</DatePicker>
			</div>
			<div>
				<DatePicker datePickerType="single">
					<DatePickerInput name="end_date" labelText="End date" placeholder="mm/dd/yyyy" />
				</DatePicker>
			</div>
			<div class="">
				<Button on:click={submitHandler}>Generate</Button>
			</div>
		</div>
	</form>
</div>
