<script>
	// import Chart1st from './Chart1st.svelte';
	// import Chart2nd from './Chart2nd.svelte';
	import OrganizationalChart from './OrganizationalChart.svelte';
	import TrainingStatusChart from './TrainingStatusChart.svelte';
	import GenderWiseChart from './GenderWiseChart.svelte';
	import PlannedChart from './PlannedChart.svelte';
	import CourseWiseChart from './CourseWiseChart.svelte';
</script>

<div class="t-grid t-grid-cols-5 t-gap-4 t-content-center t-items-center t-mb-6">
	<!-- <Chart1st Class={'t-col-span-3'} /> -->
	<OrganizationalChart Class={'t-col-span-3 '} />
	<!-- <Chart2nd Class={'t-col-span-2'} /> -->
	<TrainingStatusChart Class={'t-col-span-2'} />
	<GenderWiseChart Class={'t-col-span-2'} />
	<PlannedChart Class={'t-col-span-3'}  />
	<CourseWiseChart Class={'t-col-span-5'} />
</div>
