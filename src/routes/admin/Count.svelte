<script lang="ts">
	import { dashboardData } from '$lib/store/dashboard';
	import { InlineLoading } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	interface CountNum {
		numOfResource: string;
		title: string;
	}

	let CountList;

	$: CountList = $dashboardData.participantAndResource;

	onMount(async () => {
		dashboardData.getParticipantsAndResources();
	});
</script>

<div class="t-grid md:t-grid-cols-2 t-gap-4">
	<div class="t-py-2">
		<div class="t-bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] t-py-6 t-rounded-lg">
			<div class="t-text-center t-font-semibold t-py-2">
				{#if $dashboardData.loading}
					<InlineLoading class=" t-block " />
				{:else}
					<span class="t-text-[32px]">{CountList.total_participant_enrolled}</span>
				{/if}
			</div>
			<div class="t-text-center t-font-semibold">
				<span class="t-text-base t-text-[#808083]">Participants Enrolled</span>
			</div>
		</div>
	</div>
	<div class="t-py-2">
		<div class="t-bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] t-py-6 t-rounded-lg">
			<div class="t-text-center t-font-semibold t-py-2">
				{#if $dashboardData.loading}
					<InlineLoading class=" t-block " />
				{:else}
					<span class="t-text-[32px]">{CountList.total_resource_person}</span>
				{/if}
			</div>
			<div class="t-text-center t-font-semibold">
				<span class="t-text-base t-text-[#808083]">Total Resource Person</span>
			</div>
		</div>
	</div>
</div>
