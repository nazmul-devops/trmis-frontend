<script lang="ts">
	import calendarize from './test';
	import Arrow from './Arrow.svelte';

	export let today: Date; // Date
	export let year = today.getFullYear();
	export let month = today.getMonth(); // Jan
	export let offset = 0; // Sun

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

	let courses = {
		3: [
			'course one',
			'course two',
			'course two',
			'course two',
			'course two',
			'course two',
			'course two'
		],
		4: ['course one', 'course two'],
		5: ['course one', 'course two'],
		25: ['course one', 'course two', 'course three'],
		26: ['course one', 'course two', 'course three']
	};

	function getCoursesByDay(dayNumber) {
		return courses[dayNumber] ? courses[dayNumber] : [];
	}

	// $: today_month = today && today.getMonth();
	// $: today_year = today && today.getFullYear();
	// $: today_day = today && today.getDate();

	let prev = calendarize(new Date(year, month - 1), offset);
	let current = calendarize(new Date(year, month), offset);
	let next = calendarize(new Date(year, month + 1), offset);

	function toPrev() {
		[current, next] = [prev, current];

		if (--month < 0) {
			month = 11;
			year--;
		}

		prev = calendarize(new Date(year, month - 1), offset);
	}

	function toNext() {
		[prev, current] = [current, next];

		if (++month > 11) {
			isToday;
			month = 0;
			year++;
		}

		next = calendarize(new Date(year, month + 1), offset);
	}

	function isToday(day) {
		return (
			today && today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
		);
	}

	let height = '90%';
</script>

<header class="t-flex t-my-5 t-mx-auto t-justify-center t-items-center t-select-none">
	<Arrow left on:click={toPrev} />
	<h4 class="t-block t-text-center t-uppercase t-text-4xl">{months[month]} {year}</h4>
	<Arrow on:click={toNext} />
</header>

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
						class=" t-h-full md:t-h-36 t-text-sm  t-border-solid t-border t-p-3 t-border-gray-400 t-text-semibold "
						class:today={isToday(current[idxw][idxd])}
					>
						<span>
							{current[idxw][idxd]}
						</span>
						<div class="t-max-h-[90%] t-text-left t-overflow-y-auto calendarBar">
							{#each getCoursesByDay(current[idxw][idxd]) as schedule}
								<li class=" ">{schedule}</li>
							{/each}
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

<style>
</style>
