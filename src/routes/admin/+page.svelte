<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import { ComboBox, DatePicker, DatePickerInput } from 'carbon-components-svelte';

	import * as yup from 'yup';
	import Chart from '../../lib/Chart.svelte';
	import Count from './Count.svelte';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	// export let timeInterval = {
	// 	id: null,
	// 	distance: null
	// };
	const timeIntervalDistance = [
		{ id: 1, text: '2015' },
		{ id: 2, text: '2016' },
		{ id: 3, text: '2017' },
		{ id: 4, text: '2018' },
		{ id: 5, text: '2019' },
		{ id: 6, text: '2020' },
		{ id: 7, text: '2021' },
		{ id: 8, text: '2022' },
		{ id: 9, text: '2023' },
		{ id: 10, text: '2024' },
		{ id: 11, text: '2025' }
	];

	const schema = yup.object({
		distance: yup.string()
	});

	const { form, reset, createSubmitHandler, setData, errors, data } = createForm({
		extend: validator({ schema })
	});

	const submitHandler = createSubmitHandler({
		onSubmit: async (data) => {
			// if (timeInterval.id) {
			// 	await trainingCenters.updateTrainingCenter({ ...data, id: trainingCenter.id });
			// } else {
			// 	await trainingCenters.createTrainingCenter({ ...data });
			// }
			// open = false;
			reset();
		}
	});

	$: timeIntervalLists = timeIntervalDistance.map((items) => ({ ...items }));
</script>

<div>
	<Count />
	<div class="t-grid md:t-grid-cols-2 t-gap-4 t-my-8">
		<div class="">
			<form use:form>
				<div class=" t-flex t-gap-2 ">
					<ComboBox
						bind:selectedId={$data.distance}
						titleText="Year"
						placeholder="Choose Year"
						items={timeIntervalLists}
						{shouldFilterItem}
					/>
					<div>
						<DatePicker
							datePickerType="single"
							bind:value={$data.endDate}
							dateFormat="m/Y"
							on:change
						>
							<DatePickerInput labelText="From Month" placeholder="mm/yyyy" />
						</DatePicker>
					</div>
					<div>
						<DatePicker
							datePickerType="single"
							bind:value={$data.endDate}
							dateFormat="m/Y"
							on:change
						>
							<DatePickerInput labelText="To Month" placeholder="mm/yyyy" />
						</DatePicker>
					</div>
				</div>
			</form>
		</div>
	</div>

	<Chart />
</div>
