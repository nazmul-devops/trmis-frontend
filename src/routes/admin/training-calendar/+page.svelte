<script>
	import Calender from './Calender.svelte';
	const today = new Date();
</script>

<Calender {today} year={today.getFullYear()} />

<!-- <script>
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';
	let currentDate = null;

	onMount(async () => {
		currentDate = DateTime.local();
	});today
</script>

<table>
    <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
    </tr>
    {#each Array.from({ length: currentDate.daysInMonth }).map((_, i) => currentDate.startOf("month").plus({ days: i })) as date}
        {#if date.weekday === 7}
            <tr></tr>
        {/if}/
        <td>{date.day}</td>
    {/each}
</table>


<button on:click={() => currentDate = currentDate.minus({ months: 1 })}>Previous</button>
<button on:click={() => currentDate = currentDate.plus({ months: 1 })}>Next</button> -->
