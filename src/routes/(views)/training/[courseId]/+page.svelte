<script>
	import { httpWeb } from '$lib/service/auth';
	import { page } from '$app/stores';
	import PageTitle from '$lib/PageTitle.svelte';
	import { ComboBox } from 'carbon-components-svelte';
	import { getLocations } from '$lib/service/locations';
	import { getTrainingCenters } from '$lib/service/trainingCenter';
	import { onMount } from 'svelte';
	

	let title = '2-Day training on EQA Lab';
	let batchesByYear = [];

	// async function getCourseDetails(courseId) {
	// 	let {
	// 		data: { data }
	// 	} = await httpWeb.get(`mock/trainitails`);
	// 	console.log(data);
	// 	title = data.course.name;
	// 	batchesByYear = data.batchesByYea r;
	// }

	// $: {
	// 	if ($page.params) {
	// 		getCourseDetails($page.params.courseId);
	// 	}
	// }

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	let trainingCenterId;
	let trainingCenter = [];
	let selectedDivisionId;
	let selectedZilaId;
	let selectedUpazilaId;

	let zilaOptions = [];
	let upazilaOptions = [];
	let locations = [];

	$: {
		getLocations().then((resp) => {
			locations = resp.data;
		});
	}

	$: {
		if (selectedDivisionId) {
			let index = locations.findIndex((item) => item.id === selectedDivisionId);
			zilaOptions = locations[index]?.zilas;
		} else {
			zilaOptions = [];
			selectedZilaId = null;
		}
	}

	$: {
		if (selectedZilaId) {
			let index = zilaOptions.findIndex((item) => item.id === selectedZilaId);
			upazilaOptions = zilaOptions[index]?.upazilas;
		} else {
			upazilaOptions = [];
			selectedUpazilaId = null;
		}
	}

	$: {
		if (selectedUpazilaId) {
			getTrainingCenters(selectedUpazilaId).then((resp) => {
				trainingCenter = resp.data.map((item) => ({ ...item, text: item.name }));
			});
		} else {
			trainingCenterId = null;
		}
	}

	const YEARINTERVAL = [
		{ id: 1, text: '2020'},
		{ id: 2, text: '2021'},
		{ id: 3, text: '2023'},
		{ id: 4, text: '2024'},
		{ id: 5, text: '2025'},
	];

	const batches = [
		{
			id: 1,
			name: 'batch 1',
			trainees: 200
		},
		{
			id: 2,
			name: 'batch 2',
			trainees: 100
		},
		{
			id: 3,
			name: 'batch 3',
			trainees: 20
		},
		{
			id: 5,
			name: 'batch 4',
			trainees: 15
		},
		{
			id: 5,
			name: 'batch 5',
			trainees: 50
		},
	]

	onMount(() => {
	});
</script>

<div class="t-mb-12">
	<div>
		<PageTitle Title={title} desc="" />
	</div>
	<div class="t-px-6 md:t-px-8 lg:t-px-12 xl:t-px-16 2xl:t-px-20 t-mt-10">
		<div class="t-grid t-grid-cols-1">
			<form>
				<div class="t-grid md:t-grid-cols-2 lg:t-grid-cols-5 t-gap-4">
					<ComboBox
						placeholder="Choose Organization"
						items={[
							{ id: 1, text: 'NTP' },
							{ id: 2, text: 'Others'}
						]}
						{shouldFilterItem}
					/>

					<ComboBox
						placeholder="Select Year"
						items={YEARINTERVAL}
						{shouldFilterItem}
					/>
					<ComboBox
						bind:selectedId={selectedDivisionId}
						placeholder="Select Division"
						items={locations}
						{shouldFilterItem}
					/>
					<ComboBox
						disabled={!selectedDivisionId}
						bind:selectedId={selectedZilaId}
						placeholder={selectedDivisionId ? 'Select District' : 'Select Division first'}
						items={zilaOptions}
						{shouldFilterItem}
					/>
					<ComboBox
						disabled={!selectedZilaId}
						bind:selectedId={selectedUpazilaId}
						placeholder={selectedZilaId ? 'Select Sub-District' : 'Select District first'}
						items={upazilaOptions}
						{shouldFilterItem}
					/>
				</div>
			</form>
		</div>
	</div>

	<div class="t-grid t-grid-cols-5 t-place-items-center t-mt-10">
		<div class="t-col-start-2 t-col-span-3 t-mx-auto">
			<div
				class="t-bg-gradient-to-b t-from-[#F94646] t-to-[#44835C] t-rounded-md t-pl-2 t-shadow-lg  t-col-span-1 t-w-full"
			>
				<div
					class="t-group t-shadow-lg hover:t-shadow-2xl t-duration-200 t-delay-75 t-bg-white t-rounded-md t-py-10 t-px-2"
				>
					<div class="t-flex t-justify-between t-items-center">
						<div>
							<p class="t-text-2xl t-font-bold t-text-[#44835C] group-hover:t-text-gray-700 t-pr-8">
								Total Number of Participant
							</p>
						</div>
						<div
							class="t-bg-gradient-to-r t-from-rose-100/[.05] t-to-teal-100/[.5]  t-p-2 t-rounded-md"
						>
							<p
								class="t-text-4xl t-font-bold t-text-transparent t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C] group-hover:t-text-[#F94646]"
							>
								1000
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-20 xl:t-px-24 2xl:t-px-28 t-pt-20 ">
		<div class="t-grid t-grid-cols-2 md:t-gap-4 sm:t-gap-1 t-py-5 t-place-items-center">
			<div class="t-col-span-1  ">
				<span
					class="t-font-semibold t-text-transparent t-text-2xl t-text-left t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
				>
					Batch
				</span>
			</div>
			<div class="t-col-span-1 t-text-right ">
				<span
					class="t-font-semibold t-text-transparent t-text-2xl t-text-right t-bg-clip-text t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]"
				>
					Participant
				</span>
			</div>
		</div>
	</div>
	<div class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-pb-5">
		<div
			class="t-bg-gradient-to-r t-from-[#F94646] t-to-[#44835C]  t-rounded-md t-py-1 t-shadow-lg"
		>
			<div
				class="t-grid lg:t-grid-cols-2 md:t-grid-cols-1 t-gap-4 t-py-5 t-bg-white t-rounded-md t-px-4"
			>
				<div class="lg:t-col-span-2 md:t-col-1 t-text-center">
					{#each batches as batch}
						<div class="t-grid t-grid-cols-2  t-mx-auto t-py-2 ">
							<div class="t-col-span-1 t-text-2xl t-text-center t-text-[#44835C]">
								{batch.name}
							</div>
							<div class="t-col-span-1  t-text-center t-text-2xl t-font-semibold t-text-[#44835C]">
								{batch.trainees}
							</div>
						</div>
						<hr class="t-border-[#88C29E] t-border-t-[1.5px]" />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
