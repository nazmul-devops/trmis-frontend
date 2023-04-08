<script>
	import {
		dashboardOrganization,
		dashboardGenderWiseTraining,
		dashboardPlannedBatch,
		dashboardCategoryParticipant,
		dashboardTrainingStatus	
	} from '$lib/store/dashboard';
	import OrganizationalChart from './OrganizationalChart.svelte';
	import TrainingStatusChart from './TrainingStatusChart.svelte';
	import GenderWiseChart from './GenderWiseChart.svelte';
	import PlannedChart from './PlannedChart.svelte';
	import CourseWiseChart from './CourseWiseChart.svelte';

	//Organization Chart
	$: labels =
		$dashboardOrganization.data.length == 0
			? ['---', '---', '---', '---', '---']
			: $dashboardOrganization.data.map((item) => item.organization_name);

	$: data =
		$dashboardOrganization.data.length == 0
			? [0, 0, 0, 0, 0]
			: $dashboardOrganization.data.map((item) => item.participant);

	//Training Status Chart

	$: status =
		$dashboardTrainingStatus.data.length == 0
			? ['---', '---', '---']
			: $dashboardTrainingStatus.data.map((item) => item.name);

	$: statusData =
		$dashboardTrainingStatus.data.length == 0
			? [0, 0, 0]
			: $dashboardTrainingStatus.data.map((item) => item.value);

	//Gender Wise Chart

	$: genderName =
		$dashboardGenderWiseTraining.data.length == 0
			? ['---', '---']
			: $dashboardGenderWiseTraining.data.map((item) => item.name);

	$: genderData =
		$dashboardGenderWiseTraining.data.length == 0
			? [0, 0]
			: $dashboardGenderWiseTraining.data.map((item) => item.value);

	//Planned Vs Completed Batch

	$: plannedLabels =
		$dashboardPlannedBatch.data.length == 0
			? ['---', '---']
			: $dashboardPlannedBatch.data.map((item) => item.name);

	$: plannedData =
		$dashboardPlannedBatch.data.length == 0
			? [0, 0]
			: $dashboardPlannedBatch.data.map((item) => item.value);

	//Number Of Participant From Diffrent Categories Chart

	$: courseLabels =
		$dashboardCategoryParticipant.data.length == 0
			? ['---', '---', '---', '---']
			: $dashboardCategoryParticipant.data.map((item) => item.training_course_category);

	$: courseData =
		$dashboardCategoryParticipant.data.length == 0
			? [0, 0, 0, 0]
			: $dashboardCategoryParticipant.data.map((item) => item.particpant);
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
