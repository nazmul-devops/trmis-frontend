<script>
	import { httpWeb } from '$lib/service/auth';
	import PageTitle from '$lib/PageTitle.svelte';
	import { onMount } from 'svelte';
	import EventCard from './EventCard.svelte';
	import { EVENTDATA } from '$lib/constants';

	onMount(() => {});
</script>

<div>
	<div>
		<PageTitle
			Title="Event"
			desc="Please take a look at our list of completed events to see what we've done in the past and get a sense of what types of events we offer. "
		/>
		<div
			class="md:t-container sm:t-px-6 md:t-px-8 lg:t-px-16 xl:t-px-20 2xl:t-px-24 t-py-32 t-transition t-ease-in-out t-delay-150  t-hover:-translate-y-1 t-hover:scale-110 t-hover:bg-indigo-500 t-duration-300"
		>
			<div class="t-grid md:t-grid-cols-2 sm:t-grid-cols-1 t-gap-4">
				{#each EVENTDATA as { title, id, link }}
					<a href={`/event/${id}`} class="t-text-gray-500"> <EventCard course={title} {link} /></a>
				{/each}
			</div>
		</div>
	</div>
</div>
