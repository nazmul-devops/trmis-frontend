<script>
	import { getLocations } from '$lib/service/locations';
	import { getBatches } from '$lib/service/batch';
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	let selectedDivisionId;
	let selectedZilaId;
	let selectedUpazilaId;

	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];
	let Batches = [];

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
		getBatches().then((resp) => {
			Batches = resp.data;
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

	$: Course = $trainingCourses.data.map((item) => ({ ...item, text: item.title }));
	$: Batch = Batches.map((item) => ({ ...item, text: item.name }));

	onMount(() => {
		trainingCourses.getTrainingCourses();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Cost Center Report</h4>
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
		<ComboBox
			titleText="Training"
			placeholder="Select Training"
			items={Course}
			{shouldFilterItem}
		/>
		<ComboBox titleText="Batch" placeholder="Select Batch" items={Batch} {shouldFilterItem} />
		<div class="">
			<Button>Generate</Button>
		</div>
	</div>
</div>
