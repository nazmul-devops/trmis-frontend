<script lang="ts">
	import CourseWiseChart from '$lib/CourseWiseChart.svelte';
	import TrainingStatusChart from '$lib/TrainingStatusChart.svelte';
	import GenderWiseChart from '$lib/GenderWiseChart.svelte';
	import AboutContent from './AboutContent.svelte';
	import NoticeBoard from './NoticeBoard.svelte';

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
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-24 t-min-h-[80vh]">
		<div class="t-grid t-grid-cols-1 md:t-grid-cols-12 lg:t-gap-4 t-place-content-center">
			<div class="t-col-span-4 t-bg-[#F2F5F7] t-px-4 t-rounded-md ">
				<div class="t-my-5">
					<h3 class=" t-text-[#111] t-text-[20px] t-font-medium t-py-2">Notice Board</h3>
					<div class="t-h-[20vh] md:t-h-[70vh] t-overflow-y-scroll t-px-3">
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
		class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-min-h-screen t-py-10"
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
									<div
										class="t-rounded"
									>
										<p
											class="t-text-[32px] t-text-[#111111] t-font-bold"
										>
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
				<CourseWiseChart />
			</div>

			<div class="t-grid t-grid-cols-2 t-gap-4 t-px-10 t-mb-5">
				<div>
					<TrainingStatusChart />
				</div>
				<div>
					<GenderWiseChart />
				</div>
			</div>
		</div>
	</div>
</div>
