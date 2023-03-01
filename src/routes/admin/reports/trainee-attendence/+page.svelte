<script>
	import { getLocations } from '$lib/service/locations';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let selectedDivisionId;
	let selectedZilaId;
	let selectedUpazilaId;

	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	$: {
		getLocations().then((resp) => {
			locations = resp.data;
		});
	}

	$: {
		if (selectedZilaId) {
			let index = zilaOptions.findIndex((item) => item.id === selectedZilaId);
			upazilaOptions = zilaOptions[index]?.upazilas;
		} else {
			upazilaOptions = [];
			selectedUpazilaId = null;
		}
	}

	$: {
		if (selectedDivisionId) {
			let index = locations.findIndex((item) => item.id === selectedDivisionId);
			zilaOptions = locations[index]?.zilas;
		} else {
			zilaOptions = [];
			selectedZilaId = null;
		}
	}
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Trainee Attendence Report</h4>
	</div>
	<div class="t-flex t-gap-4 t-items-center   ">
		<ComboBox
			bind:selectedId={selectedDivisionId}
			titleText="Division"
			placeholder="Select Division"
			items={locations}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!selectedDivisionId}
			bind:selectedId={selectedZilaId}
			titleText="Training District"
			placeholder="Select District"
			items={zilaOptions}
			{shouldFilterItem}
		/>
		<ComboBox
			disabled={!selectedZilaId}
			bind:selectedId={selectedUpazilaId}
			titleText="Training Sub-District"
			placeholder="Select Sub District"
			items={upazilaOptions}
			{shouldFilterItem}
		/>
		<div>
			<DatePicker datePickerType="single" on:change>
				<DatePickerInput class="t-w-full" labelText="Start date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div>
			<DatePicker datePickerType="single" on:change>
				<DatePickerInput labelText="End date" placeholder="mm/dd/yyyy" />
			</DatePicker>
		</div>
		<div class="">
			<Button>Generate</Button>
		</div>
	</div>
</div>
