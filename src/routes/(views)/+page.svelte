<script lang="ts">
	import Chart1st from '$lib/Chart1st.svelte';
	import Map from '../admin/map.svelte';
	import { httpWeb } from '$lib/service/auth';
	import { onMount } from 'svelte';

	let noticeData = []

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
			name: 'Courses',
			count: 29,
			icon: 'las la-file-alt'
		},
		{
			name: 'Trainings',
			count: 22,
			icon: 'las la-book-reader'
		},
		{
			name: 'Trainees',
			count: 1000,
			icon: 'las la-user'
		},
		{
			name: 'Training Center',
			count: 10,
			icon: 'las la-map-marker'
		}
	];

	onMount(()=>{
		getNotice();
	})
</script>

<div
	class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24  t-min-h-screen t-py-16"
>
	<div class="t-grid xl:t-grid-cols-4 md:t-grid-cols-2 t-gap-4 t-mb-11 ">
		{#each homecard as card}
			<div
				class="t-bg-gradient-to-b t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pl-2 t-shadow-lg  t-col-span-1 t-w-full"
			>
				<div
					class="t-group t-shadow-lg hover:t-shadow-2xl t-duration-200 t-delay-75 t-bg-white t-rounded-md t-py-10 t-px-2"
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
	<div class="t-grid t-grid-cols-1 t-gap-4 t-mb-5">
		<div class="t-bg-white t-rounded-md t-p-5">
			<Chart1st />
		</div>
	</div>
	<div
		class="md:t-container sm:t-px-4 md:t-px-6 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-16 t-grid md:t-grid-cols-2 "
	>
		<div
			class="t-bg-[#44835C]  t-text-white t-text-center t-flex t-justify-center t-flex-col t-col-span-1 t-items-center t-py-4"
		>
			<h4 class="t-text-xl t-uppercase t-font-light  t-mb-1">hello</h4>
			<p class="t-font-display t-text-xl sm:t-text-left md:t-text-justify t-px-8">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
				laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
				architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
				aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
				voluptatem sequi nesciunt.
			</p>
		</div>
		<div class="t-col-span-1">
			<img src="/assets/bg-img.jpg" alt="" class="t-h-full" />
		</div>
	</div>

	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-24">
		{#each noticeData as { title, description, date, files }}
			<a href={files} class="t-text-gray-500" target="_blank" rel="noreferrer" >
				<div
					class="t-relative t-p-8 t-overflow-hidden t-border t-bg-white t-border-slate-100 t-rounded-lg t-mt-4 t-shadow-lg"
				>
					<span
						class="t-absolute t-inset-x-0 t-bottom-0 t-h-2 t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
					/>

					<div class="t-justify-between t-sm:flex">
						<div>
							<h5 class="t-text-xl t-font-bold t-text-slate-900">{title}</h5>
							<p class="t-mt-1 t-text-xs t-font-medium t-text-slate-600">{date}</p>
						</div>
					</div>

					<div class="t-mt-4 t-sm:pr-8">
						<p class="t-text-sm t- text-slate-500 t-pb-6">
							{description}
						</p>
						<a
							href={files}
							class="t-text-xl t-font-bold  t-text-[#44835C] t-flex t-justify-center"
							target="_blank"
							rel="noreferrer"
						>
							Open here! <i class="las la-arrow-right t-text-[#F94646] t-font-bold t-text-2xl" />
						</a>
					</div>
				</div>
			</a>
		{/each}
	</div>

	<div class="t-grid t-grid-cols-1 t-gap-4">
		<div class="t-bg-white t-rounded-md t-p-5">
			<Map />
		</div>
	</div>
</div>
