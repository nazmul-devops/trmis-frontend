<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import { ComboBox, DatePicker, DatePickerInput } from 'carbon-components-svelte';
	import * as yup from 'yup';
	import Chart from '../../lib/Chart.svelte';
	import Count from './Count.svelte';
	import { MONTH_NAME } from '$lib/constants';
	import { onMount } from 'svelte';
	import {
		dashboardCategoryParticipant,
		dashboardGenderWiseTraining,
		dashboardOrganization,
		dashboardPlannedBatch,
		dashboardSpeceficCategories,
		dashboardSpeceficCategoryData,
		dashboardTrainingStatus
	} from '$lib/store/dashboard';

	let yearId;
	let startMonthId;
	let endMonthId;

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	let years = [];
	const currentYear = new Date().getFullYear();

	for (let year = currentYear; year >= 2000; year--) {
		years = [...years, { id: year, text: year.toString() }];
	}

	const schema = yup.object({
		year: yup.string(),
		start_month: yup.string(),
		end_month: yup.string()
	});

	const { form } = createForm({
		extend: validator({ schema })
	});

	$: {
		if (yearId == null) {
			startMonthId = null;
			endMonthId = null;
		} else if (startMonthId == null) {
			endMonthId = null;
		}
	}

	$: {
		if (yearId != null && startMonthId != null && endMonthId != null) {
			dashboardOrganization.getParticipantsFromOrganization(yearId, startMonthId, endMonthId);
			dashboardTrainingStatus.getTrainingStatus(yearId, startMonthId, endMonthId);
			dashboardGenderWiseTraining.getGenderWiseTraining(yearId, startMonthId, endMonthId);
			dashboardPlannedBatch.getPlannedBatch(yearId, startMonthId, endMonthId);
			dashboardCategoryParticipant.getParticipantFromCategories(yearId, startMonthId, endMonthId);
			dashboardSpeceficCategories.getSpeceficCategories();
		} else if (startMonthId == null && endMonthId == null) {
			dashboardOrganization.getParticipantsFromOrganization(yearId);
			dashboardTrainingStatus.getTrainingStatus(yearId);
			dashboardGenderWiseTraining.getGenderWiseTraining(yearId);
			dashboardPlannedBatch.getPlannedBatch(yearId);
			dashboardCategoryParticipant.getParticipantFromCategories(yearId);
			dashboardSpeceficCategories.getSpeceficCategories();
		}
	}

	onMount(() => {});
</script>

<div>
	<Count />
	<div class="t-my-8">
		<div class="">
			<form use:form>
				<div class=" t-grid t-grid-cols-2 md:t-grid-cols-4 lg:t-grid-cols-5">
					<div class="t-col-span-1 customComboBox">
						<ComboBox
							bind:selectedId={yearId}
							titleText="Year"
							placeholder="Choose Year"
							items={years}
							{shouldFilterItem}
						/>
					</div>
					<div class="t-my-4 md:t-my-0 t-col-span-3 customDatePicker">
						<div class="t-flex">
							<ComboBox
								disabled={!yearId}
								bind:selectedId={startMonthId}
								titleText="From Month"
								placeholder="Choose Month"
								items={MONTH_NAME}
								{shouldFilterItem}
							/>
							<ComboBox
								disabled={!startMonthId}
								bind:selectedId={endMonthId}
								titleText="To Month"
								placeholder="Choose Month"
								items={MONTH_NAME.map((item) => ({ ...item, disabled: item.id <= startMonthId }))}
								{shouldFilterItem}
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>

	<Chart />
</div>
