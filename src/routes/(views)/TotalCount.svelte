<script lang="ts">
	import { dashboardParticipantAndResource } from '$lib/store/dashboard';
	import { InlineLoading } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	interface CountNum {
		numOfResource: string;
		title: string;
	}

	let CountList;

	$: CountList = $dashboardParticipantAndResource.data;

	onMount(async () => {
		dashboardParticipantAndResource.getParticipantsAndResources();
	});
</script>

<div class="t-grid t-grid-cols-1 md:t-grid-cols-2 lg:t-grid-cols-3 t-gap-4">
	<div class="t-py-2">
		<div class="t-bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] t-py-6 t-rounded-lg">
			<div class="t-text-center t-font-semibold t-py-2">
				{#if $dashboardParticipantAndResource.loading}
					<InlineLoading class=" t-block " />
				{:else}
					<span class="t-text-[32px] t-text-[#111111]">{CountList.total_participant_enrolled}</span>
				{/if}
			</div>
			<div class="t-text-center t-font-semibold">
				<span class="t-text-base t-text-[#747474]">Participants Enrolled</span>
			</div>
		</div>
	</div>
	<div class="t-py-2">
		<div class="t-bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] t-py-6 t-rounded-lg">
			<div class="t-text-center t-font-semibold t-py-2">
				{#if $dashboardParticipantAndResource.loading}
					<InlineLoading class=" t-block " />
				{:else}
					<span class="t-text-[32px] t-text-[#111111]">{CountList.total_resource_person}</span>
				{/if}
			</div>
			<div class="t-text-center t-font-semibold">
				<span class="t-text-base t-text-[#747474]">Total Resource Person</span>
			</div>
		</div>
	</div>
    <div class="t-py-2">
		<div class="t-bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.9)] t-py-6 t-rounded-lg">
			<div class="t-text-center t-font-semibold t-py-2">
				{#if $dashboardParticipantAndResource.loading}
					<InlineLoading class=" t-block " />
				{:else}
					<span class="t-text-[32px] t-text-[#111111]">{CountList.batch}</span>
				{/if}
			</div>
			<div class="t-text-center t-font-semibold">
				<span class="t-text-base t-text-[#747474]">Total Batch</span>
			</div>
		</div>
	</div>
</div>
