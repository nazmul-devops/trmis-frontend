<script>
	import { trainingCourses } from '$lib/store/trainingCourse';
	import { ComboBox, DatePicker, DatePickerInput, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	$: Courses = $trainingCourses.data.map((item) => ({ ...item, text: item.title }));

	onMount(() => {
		trainingCourses.getTrainingCourses();
	});
</script>

<div class="">
	<div class=" t-my-5">
		<h4>Training Course Curriculum Report</h4>
	</div>
	<div class="t-flex t-gap-4 t-items-center   ">
		<div>
			<ComboBox
				titleText="Training"
				placeholder="Select Training"
				items={Courses}
				{shouldFilterItem}
			/>
		</div>
		<div class="">
			<Button>Generate</Button>
		</div>
	</div>
</div>
