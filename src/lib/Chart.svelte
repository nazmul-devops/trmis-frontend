<script>
	import { dashboardData } from '$lib/store/dashboard';
	import OrganizationalChart from './OrganizationalChart.svelte';
	import TrainingStatusChart from './TrainingStatusChart.svelte';
	import GenderWiseChart from './GenderWiseChart.svelte';
	import PlannedChart from './PlannedChart.svelte';
	import CourseWiseChart from './CourseWiseChart.svelte';

	$: {
		dashboardData.getParticipantsFromOrganization();
		dashboardData.getTrainingStatus();
		dashboardData.getGenderWiseTraining();
		dashboardData.getPlannedBatch();
	}
	//Organization Chart
	$: labels =
		$dashboardData.participantFromOrganization.length == 0
			? ['---', '---', '---', '---']
			: $dashboardData.participantFromOrganization.map((item) => item.organization_name);

	$: data =
		$dashboardData.participantFromOrganization.length == 0
			? [0, 0, 0, 0]
			: $dashboardData.participantFromOrganization.map((item) => item.participant);

	// $: statusList = Object.entries($dashboardData.trainingStatus);
	$: status = $dashboardData.trainingStatus.map((item) => item[0]);
	$: statusData = $dashboardData.trainingStatus.map((item) => item[1]);

	$: {
		console.log($dashboardData.trainingStatus);
		// console.log(statusData);
	}
</script>

<div class="t-grid t-grid-cols-5 t-gap-4 t-content-center t-items-center t-mb-6">
	<!-- <Chart1st Class={'t-col-span-3'} /> -->
	<OrganizationalChart Class={'t-col-span-3 '} {labels} {data} />
	<!-- <Chart2nd Class={'t-col-span-2'} /> -->
	<TrainingStatusChart Class={'t-col-span-2'} {status} {statusData} />
	<GenderWiseChart Class={'t-col-span-2'} />
	<PlannedChart Class={'t-col-span-3'} />
	<CourseWiseChart Class={'t-col-span-5'} />
</div>
