<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { ComboBox, Modal } from 'carbon-components-svelte';
	import calendarize from './test';
	import Arrow from './Arrow.svelte';
	import { getCalenders } from '$lib/service/calendar';
	import { getLocations } from '$lib/service/locations';
	import { getTrainingCenters } from '$lib/service/trainingCenter';
	import { CALENDER_VIEW_TYPE } from '$lib/constants';
	import { onMount } from 'svelte';

	export let today: Date; // Date
	export let year = today.getFullYear();
	export let month = today.getMonth(); // Jan
	export let offset = 0; // Sun
	let open = false;
	let trainingScheduleList = [];

	export let labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	export let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'July',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	let courses = {};
	let trainingCenterId;
	let thisDate;

	$: {
	}

	$: {
		getCalenders(
			trainingCenterId,
			selectedDivisionId,
			selectedZilaId,
			selectedUpazilaId,
			year,
			month + 1
		).then((resp) => {
			courses = resp.data;
		});
	}

	let prev = calendarize(new Date(year, month - 1), offset);
	let current = calendarize(new Date(year, month), offset);
	let next = calendarize(new Date(year, month + 1), offset);

	function toPrev() {
		[current, next] = [prev, current];

		if (--month < 0) {
			month = 11;
			year--;
		}
		courses = {};
		prev = calendarize(new Date(year, month - 1), offset);
	}

	function toNext() {
		[prev, current] = [current, next];

		if (++month > 11) {
			isToday;
			month = 0;
			year++;
		}
		courses = {};
		next = calendarize(new Date(year, month + 1), offset);
	}

	function isToday(day) {
		return (
			today && today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
		);
	}

	function shouldFilterItem(item, value) {
		if (!value) return true;
		return item.text.toLowerCase().includes(value.toLowerCase());
	}

	let trainingCenter = [];

	let selectedDivisionId;
	let viewId;
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

	const schema = yup.object({
		division: yup.number().required().typeError('Select Division'),
		district: yup.number().required().typeError('Select District'),
		sub_district: yup.number().required().typeError('Select District')
	});

	const { data } = createForm({
		initialValues: {
			sub_district: null,
			division: null,
			district: null,
			viewType: 1,
			trainingCenter: null,
		},
		extend: validator({ schema })
	});

	onMount(async () => {});
</script>

<div class="">
	<form>
		<div class=" t-grid t-grid-cols-2 t-gap-4 lg:t-grid-cols-4">
			<div class="t-my-2">
				<ComboBox
					titleText="Calender View"
					placeholder="Select Map View"
					bind:selectedId={$data.viewType}
					items={CALENDER_VIEW_TYPE}
				/>
			</div>
			<div class="t-my-2">
				<ComboBox
					bind:selectedId={$data.division}
					titleText="Division"
					placeholder="Select Division"
					items={locations}
					{shouldFilterItem}
				/>
			</div>
			<div class="t-my-2">
				<ComboBox
					disabled={!selectedDivisionId}
					bind:selectedId={$data.district}
					titleText="Training District"
					placeholder={selectedDivisionId ? 'Select District' : 'Select Division first'}
					items={zilaOptions}
					{shouldFilterItem}
				/>
			</div>
			<div class="t-my-2">
				<ComboBox
					disabled={!selectedZilaId}
					bind:selectedId={$data.sub_district}
					titleText="Training Sub-District"
					placeholder={selectedZilaId ? 'Select Sub-District' : 'Select District first'}
					items={upazilaOptions}
					{shouldFilterItem}
				/>
			</div>
			<div class="t-my-2">
				<ComboBox
					disabled={!selectedUpazilaId}
					bind:selectedId={$data.trainingCenter}
					titleText="Training Center"
					placeholder="Select Training center"
					items={trainingCenter}
					{shouldFilterItem}
				/>
			</div>
		</div>
	</form>
</div>
<div class="t-flex t-justify-center">
	<header class="t-my-8 t-flex t-items-center t-select-none">
		<Arrow left on:click={toPrev} />
		<h4 class="t-block t-text-center t-uppercase t-text-4xl">{months[month]} {year}</h4>
		<Arrow on:click={toNext} />
	</header>
</div>
<div class="t-overflow-x-auto">
	<div class="t-grid t-grid-cols-7 t-text-right t-gap-1">
		{#each labels as txt, idx (txt)}
			<span class="t-text-semibold t-text-center t-uppercase t-mb-5 "
				>{labels[(idx + offset) % 7]}</span
			>
		{/each}

		{#each { length: 6 } as w, idxw (idxw)}
			{#if current[idxw]}
				{#each { length: 7 } as d, idxd (idxd)}
					{#if current[idxw][idxd] != 0}
						<span
							class="t-min-w-[100px] t-h-full md:t-h-36 t-text-sm  t-border-solid t-border t-p-3 t-rounded-lg t-border-[#ADD4F7] t-text-semibold t-bg-white "
							class:today={isToday(current[idxw][idxd])}
						>
							<span>
								{current[idxw][idxd]}
							</span>
							<div
								class="t-max-h-[90%] t-text-left t-overflow-y-auto calendarBar t-cursor-pointer"
								on:keypress={() => {
									trainingScheduleList = courses[parseInt(current[idxw][idxd])];
									open = true;
								}}
								on:click={() => {
									thisDate = current[idxw][idxd];
									trainingScheduleList = courses[parseInt(current[idxw][idxd])];
									open = true;
								}}
							>
								{#if Object.keys(courses).length != 0}
									{#each courses[parseInt(current[idxw][idxd])] ?? [] as schedule}
										<li class="">
											{schedule}
										</li>
									{/each}
								{/if}
							</div>
						</span>
					{:else if idxw < 1}
						<span class="t-text-[#a6b1c9] t-p-3">{prev[prev.length - 1][idxd]}</span>
					{:else}
						<span class="t-text-[#a6b1c9] t-p-3">{next[0][idxd]}</span>
					{/if}
				{/each}
			{/if}
		{/each}
	</div>
</div>
<Modal passiveModal bind:open modalHeading={`${months[month]} ${thisDate}`} on:open on:close>
	{#each trainingScheduleList as item}
		<li>
			{item}
		</li>
	{/each}
</Modal>

<style>
	.today {
		background-color: #57aaf7 !important;
	}
</style>
