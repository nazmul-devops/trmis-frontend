<script lang="ts">
	import { httpWeb } from '$lib/service/auth';
	import CourseWiseChart from '$lib/CourseWiseChart.svelte';
	import TrainingStatusChart from '$lib/TrainingStatusChart.svelte';
	import GenderWiseChart from '$lib/GenderWiseChart.svelte';
	import { onMount } from 'svelte';
	import AboutContent from './AboutContent.svelte';

	let noticeData = [];

	async function getNotice() {
		let { data } = await httpWeb.get('notice/home-page-notice/');
		noticeData = data;
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

	onMount(() => {
		getNotice();
	});
</script>

<div
	class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24  t-min-h-screen t-py-16"
>
	<div class="t-my-5">
		<AboutContent />
	</div>

	<div class=" t-p-10 t-mb-5 ">
		<h3 class=" t-text-[#44835C] t-font-bold t-text-center t-mb-11">
			Figures to Highlight Our Progress
		</h3>
		<CourseWiseChart />
	</div>

	<div class="t-grid t-grid-cols-2 t-gap-4 t-p-10 t-mb-5">
		<div>
			<TrainingStatusChart />
		</div>
		<div>
			<GenderWiseChart />
		</div>
	</div>

	<div class="t-grid xl:t-grid-cols-3 md:t-grid-cols-2 t-gap-4 t-my-11 ">
		{#each homecard as card}
			<div
				class="t-bg-gradient-to-b t-from-[#F94646] t-to-[#44835C] t-rounded-md   t-col-span-1 t-w-full"
			>
				<div class="t-group  t-duration-200 t-delay-75 t-bg-white t-rounded-md t-py-10 t-px-2">
					<div class="t-flex t-justify-between t-items-end">
						<div>
							<p
								class="t-text-3xl t-font-bold t-text-[#F94646] group-hover:t-text-gray-700 t-leading-6"
							>
								<i class={card.icon} />
							</p>
							<p class="t-text-2xl t-font-bold t-text-[#44835C] group-hover:t-text-gray-700 ">
								{card.name}
							</p>
						</div>
						<div
							class="t-bg-gradient-to-r t-from-rose-100/[.05] t-to-teal-100/[.5]  t-p-2 t-rounded-md"
						>
							<p
								class="t-text-4xl t-font-bold t-text-transparent t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] group-hover:t-text-[#F94646]"
							>
								{card.count}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-24">
		<h3 class=" t-text-[#44835C] t-font-bold t-text-center t-mb-11">Notice Board</h3>

		<div class=" t-p-5 t-bg-white ">
			{#each noticeData as { title, description, files }}
				<a href={files} class="t-text-gray-500" target="_blank" rel="noreferrer">
					<div class="t-relative t-px-8 t-py-2 t-overflow-hidden  t-mt-4 ">
						<div class="t-justify-between t-sm:flex">
							<div>
								<h5 class="t-text-xl t-font-bold t-text-[#44835C]">{title}</h5>
							</div>
						</div>

						<div class="t-mt-4 t-sm:pr-8 t-mb-4	">
							<p class="t-text-sm t- text-slate-500 t-pb-6">
								{description}
							</p>
							<a
								href={files}
								class="t-text-xl t-font-bold  t-text-[#44835C] t-flex t-items-center"
								target="_blank"
								rel="noreferrer"
							>
								Read More ! <i class="las la-arrow-right t-text-[#44835C] t-font-bold t-text-2xl" />
							</a>
						</div>
						<hr />
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
