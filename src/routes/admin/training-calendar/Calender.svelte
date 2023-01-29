<script>
	import calendarize from './test';
	import Arrow from './Arrow.svelte';

	export let year = null;
	export let month = 0; // Jan
	export let offset = 0; // Sun
	export let today = null; // Date

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

	$: today_month = today && today.getMonth();
	$: today_year = today && today.getFullYear();
	$: today_day = today && today.getDate();

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
			month = 0;
			year++;
		}

		next = calendarize(new Date(year, month + 1), offset);
	}

	function isToday(day) {
		return today && today_year === year && today_month === month && today_day === day;
	}
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
						class="t-h-28 t-text-lg  t-border-solid t-border t-border-gray-400 t-pr-2 t-text-semibold "
						class:today={isToday(current[idxw][idxd])}
					>
						{current[idxw][idxd]}
					</span>
				{:else if idxw < 1}
					<span class="t-text-[#a6b1c9]">{prev[prev.length - 1][idxd]}</span>
				{:else}
					<span class="t-text-[#a6b1c9]">{next[0][idxd]}</span>
				{/if}
			{/each}
		{/if}
	{/each}
</div>

<style>
</style>
