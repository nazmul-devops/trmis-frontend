<script lang="ts">
	import { scheduleEventsLists } from "$lib/store/schedule-events"
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { onMount } from 'svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'event_venue_name', value: 'Event Venues' },
		{ key: 'start_date', value: 'Start Date' },
		{ key: 'end_date', value: 'End Date' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let eventSchedule;

	function openModalForm(row) {
		eventSchedule = row;
		open = true;
	}

	async function doDelete() {
		await scheduleEventsLists.deleteEventSchedule(eventSchedule.id);
		deleteModal = false;
	}

	// let eventSchedules = [];

	onMount(async ()=>{
		scheduleEventsLists.getEventSchedules()
	});
</script>

{#if $scheduleEventsLists.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Event Schedule" description="" {headers} rows={$scheduleEventsLists.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ trainer_name: null, batch_name: null })}
					>Add Schedule</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction='top'>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							eventSchedule = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{rowIndex + 1 }
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:eventSchedule />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={"event schedule"} />
