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
		dashboardTrainingStatus	
	} from  '$lib/store/dashboard';

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


	interface homeCard {
		name: string;
		count: number;
		icon: string;
	}
	let homecard: Array<homeCard> = [
		{
			name: 'Participant Enrolled',
			count: 5760,
			icon: 'las la-user'
		},
		{
			name: 'Total Resource Person',
			count: 345,
			icon: 'las la-book-reader'
		},
		{
			name: 'Total Batch',
			count: 35,
			icon: 'las la-file-alt'
		}
	];
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
				<div class="t-grid xl:t-grid-cols-3 md:t-grid-cols-2 t-gap-4 t-my-11">
					{#each homecard as card}
						<div
							class="t-bg-gradient-to-b t-from-[#F94646] t-to-[#44835C] t-rounded-md t-col-span-1 t-w-full"
						>
							<div class="t-bg-white t-rounded-md t-py-4 t-px-2">
								<div class="t-text-center">
									<div class="t-rounded">
										<p class="t-text-[32px] t-text-[#111111] t-font-bold">
											{card.count}
										</p>
									</div>
									<div>
										<p class="t-font-medium t-text-[#747474]">
											{card.name}
										</p>
									</div>
								</div>
							</div>
						</div>
					{/each}
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
