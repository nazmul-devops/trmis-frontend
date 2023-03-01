<script>
	import { organizations } from '$lib/store/organization';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	$: organizaionts = $organizations.data.map((item) => ({ ...item, text: item.name }));

	onMount(() => {
		organizations.getOrganizations();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Organization Wise Trainee Report</h4>
	</div>
	<div class="t-flex t-gap-4 t-items-center   ">
		<div>
			<ComboBox
				titleText="Organizations"
				placeholder="Select Organizations"
				items={organizaionts}
				{shouldFilterItem}
			/>
		</div>
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
