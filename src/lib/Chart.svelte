<script>
	import { dashboardData } from '$lib/store/dashboard';
	import OrganizationalChart from './OrganizationalChart.svelte';
	import TrainingStatusChart from './TrainingStatusChart.svelte';
	import GenderWiseChart from './GenderWiseChart.svelte';
	import PlannedChart from './PlannedChart.svelte';
	import CourseWiseChart from './CourseWiseChart.svelte';

	//Organization Chart
	$: labels =
		$dashboardData.participantFromOrganization.length == 0
			? ['---', '---', '---', '---', '---']
			: $dashboardData.participantFromOrganization.map((item) => item.organization_name);

	$: data =
		$dashboardData.participantFromOrganization.length == 0
			? [0, 0, 0, 0, 0]
			: $dashboardData.participantFromOrganization.map((item) => item.participant);

	//Training Status Chart

	$: status =
		$dashboardData.trainingStatus.length == 0
			? ['---', '---', '---']
			: $dashboardData.trainingStatus.map((item) => item.name);

	$: statusData =
		$dashboardData.trainingStatus.length == 0
			? [0, 0, 0]
			: $dashboardData.trainingStatus.map((item) => item.value);

	//Gender Wise Chart

	$: genderName =
		$dashboardData.genderWiseTraining.length == 0
			? ['---', '---']
			: $dashboardData.genderWiseTraining.map((item) => item.name);

	$: genderData =
		$dashboardData.genderWiseTraining.length == 0
			? [0, 0]
			: $dashboardData.genderWiseTraining.map((item) => item.value);

	//Planned Vs Completed Batch

	$: plannedLabels =
		$dashboardData.planedBatch.length == 0
			? ['---', '---']
			: $dashboardData.planedBatch.map((item) => item.name);

	$: plannedData =
		$dashboardData.planedBatch.length == 0
			? [0, 0]
			: $dashboardData.planedBatch.map((item) => item.value);

	//Number Of Participant From Diffrent Categories Chart

	$: courseLabels =
		$dashboardData.participantFromCategory.length == 0
			? ['---', '---']
			: $dashboardData.planedBatch.map((item) => item.training_course_category);

	$: courseData =
		$dashboardData.participantFromCategory.length == 0
			? [0, 0]
			: $dashboardData.planedBatch.map((item) => item.particpant);
</script>

<div
	class="t-grid t-grid-cols-1 md:t-grid-cols-3 lg:t-grid-cols-5 t-gap-4 t-content-center t-items-center t-mb-6"
>
	<OrganizationalChart Class={'md:t-col-span-2 lg:t-col-span-3 '} {labels} {data} />
	<TrainingStatusChart Class={'md:t-col-span-1 lg:t-col-span-2'} {status} {statusData} />
	<GenderWiseChart Class={'md:t-col-span-1 lg:t-col-span-2'} {genderName} {genderData} />
	<PlannedChart Class={'md:t-col-span-2 lg:t-col-span-3'} {plannedLabels} {plannedData} />
	<CourseWiseChart Class={'md:t-col-span-3 lg:t-col-span-5'} {courseLabels} {courseData} />
</div>
