<script lang="ts">
	import { createForm } from 'felte'
	import { validator } from '@felte/validator-yup'
	import {
		ComboBox
	} from 'carbon-components-svelte';
	import { timeIntervalDistance } from '$lib/constants'

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

	$: timeIntervalLists = timeIntervalDistance.map(items =>({...items, text:items.text}))

</script>

<div>
	<Count />
	<div class="t-grid md:t-grid-cols-4 t-gap-4 t-my-8">
		<div class="t-col-start-4">
			<form use:form>
				<ComboBox
					bind:selectedId={$data.distance}
					titleText='Time Interval'
					placeholder='Choose Time Interval'
					items={timeIntervalLists}
					{shouldFilterItem}
				/>
			</form>
		</div>
	</div>

	<Chart />
</div>
