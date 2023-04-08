<script lang="ts">
	import TrainingStatusChart from '$lib/TrainingStatusChart.svelte';
	import GenderWiseChart from '$lib/GenderWiseChart.svelte';
	import AboutContent from './AboutContent.svelte';
	import NoticeBoard from './NoticeBoard.svelte';
	import SponsorButton from './SponsorButton.svelte';
	import OrganizationalChart from '$lib/OrganizationalChart.svelte';
	import {
		dashboardOrganization,
		dashboardGenderWiseTraining,
		dashboardPlannedBatch,
		dashboardCategoryParticipant,
		dashboardTrainingStatus	,
	} from  '$lib/store/dashboard';
	import TotalCount from './TotalCount.svelte';

	let yearId;
	let startMonthId;
	let endMonthId;

	//organizational chart
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
			: $dashboardTrainingStatus.data.map((item) => item.value );

	//Gender Wise Chart

	$: genderName =
		$dashboardGenderWiseTraining.data.length == 0
			? ['---', '---']
			: $dashboardGenderWiseTraining.data.map((item) => item.name);

	$: genderData =
		$dashboardGenderWiseTraining.data.length == 0
			? [0, 0]
			: $dashboardGenderWiseTraining.data.map((item) => item.value);

	
	$: {
		dashboardOrganization.getParticipantsFromOrganization(yearId, startMonthId, endMonthId);
		dashboardTrainingStatus.getTrainingStatus(yearId, startMonthId, endMonthId);
		dashboardGenderWiseTraining.getGenderWiseTraining(yearId, startMonthId, endMonthId);
		dashboardCategoryParticipant.getParticipantFromCategories(yearId, startMonthId, endMonthId);
	}

</script>

<div class="t-bg-white">
	<div
		class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-24 t-min-h-[50vh]"
	>
		<div class="t-grid t-grid-cols-1 md:t-grid-cols-12 lg:t-gap-4 t-place-content-center">
			<div class="t-col-span-4 t-bg-[#F2F5F7] t-px-4 t-rounded-md">
				<div class="t-my-5">
					<h3 class=" t-text-[#111] t-text-[20px] t-font-medium t-py-2">Notice Board</h3>
					<div class="t-h-[20vh] md:t-h-[110vh] lg:t-h-[130vh] t-overflow-y-auto t-px-3">
						<NoticeBoard />
					</div>
				</div>
			</div>
			<div class="t-col-span-8 t-px-4 lg:t-px-10">
				<div class="t-my-5">
					<p class="t-text-[#5E856E] t-text-[32px] t-font-bold t-text-center t-mb-11">About Us</p>
					<AboutContent />
				</div>
			</div>
		</div>
	</div>
</div>
<div class="t-bg-[#F2F5F7]">
	<div
		class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-6 lg:t-py-10"
	>
		<div class="t-bg-[#F2F5F7]">
			<div class=" t-p-10 t-mb-5">
				<h3 class=" t-text-[#44835C] t-font-bold t-text-center t-mb-11">
					Figures to Highlight Our Progress
				</h3>
				<div class="t-my-11">
					<TotalCount />
				</div>
				<OrganizationalChart {labels} {data} />
			</div>

			<div class="t-grid t-grid-cols-2 t-gap-4 t-px-10 t-mb-2 lg:t-mb-5">
				<div>
					<TrainingStatusChart {status} {statusData} />
				</div>
				<div>
					<GenderWiseChart {genderName} {genderData} />
				</div>
			</div>
		</div>
	</div>
</div>
<div class="t-bg-white">
	<div
		class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-12 xl:t-px-16 2xl:t-px-20 t-pt-6 lg:t-py-32"
	>
		<SponsorButton />
	</div>
</div>
