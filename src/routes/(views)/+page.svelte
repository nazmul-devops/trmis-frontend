<script lang="ts">
	import Chart from '$lib/Chart.svelte';
	import Chart1st from '$lib/Chart1st.svelte';
	import Chart2nd from '$lib/Chart2nd.svelte';
	import { string } from 'yup/lib/locale';

	interface homeCard {
		name: string;
		count: number;
		icon: string;
	}
	let homecard: Array<homeCard> = [
		{
			name: 'Courses',
			count: 29,
			icon: 'las la-file-alt'
		},
		{
			name: 'Trainings',
			count: 202,
			icon: 'las la-book-reader'
		},
		{
			name: 'Trainees',
			count: 1000,
			icon: 'las la-user'
		},
		{
			name: 'Locations',
			count: 10,
			icon: 'las la-map-marker'
		}
	];
</script>

<div class="t-container t-bg-gradient-to-r t-from-rose-100 t-to-teal-100 t-min-h-screen t-py-16">
	<div class="t-grid t-grid-cols-8 t-gap-4 t-mb-11 ">
		{#each homecard as card}
			<div
				class="t-bg-gradient-to-b t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pl-2 t-shadow-lg t-grid t-col-span-2 t-relative"
			>
				<div
					class="t-group t-shadow-lg hover:t-shadow-2xl t-duration-200 t-delay-75 t-w-full t-bg-white t-rounded-md t-py-10 t-pr-6 t-pl-9"
				>
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
	<div class="t-grid t-grid-cols-3 t-gap-4">
		<div class="t-grid t-col-span-2 t-bg-white t-rounded-md t-p-5">
			<Chart1st />
		</div>
		<div class="t-grid t-col-span-1  t-bg-white t-rounded-md t-p-5">
			<Chart2nd />
		</div>
	</div>
</div>
