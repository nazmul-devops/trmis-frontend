<script>
	// import Chart1st from './Chart1st.svelte';
	// import Chart2nd from './Chart2nd.svelte';
	import Chart3rd from './OrganizationalChart.svelte';
	import Chart4th from './TrainingStatusChart.svelte';
	import Chart5th from './GenderWiseChart.svelte';
	import Chart6th from './PlannedChart.svelte';
	import Chart7th from './CourseWiseChart.svelte';
</script>

<div class="t-grid t-grid-cols-5 t-gap-4 t-content-center t-items-center t-mb-6">
	<!-- <Chart1st Class={'t-col-span-3'} /> -->
	<Chart3rd Class={'t-col-span-3 '} />
	<!-- <Chart2nd Class={'t-col-span-2'} /> -->
	<Chart4th Class={'t-col-span-2'} />
	<Chart5th Class={'t-col-span-2'} />
	<Chart6th Class={'t-col-span-3'}  />
	<Chart7th Class={'t-col-span-5'} />


</div>
