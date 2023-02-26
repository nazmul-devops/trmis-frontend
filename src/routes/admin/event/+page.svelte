<script lang="ts">
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
	import { deleteEventSchedule, getEventSchedules } from '$lib/service/schedule-events';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let filteredRowIds = [];
	let headers = [
		{ key: 'event_venue', value: 'Venue' },
		{ key: 'start_date', value: 'Start Date' },
		{ key: 'end_date', value: 'End Date' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let eventSchedule;

	function openModalForm(row) {
		eventSchedule = row;
		open = true;
	}

	async function doDelete() {
		await deleteEventSchedule(eventSchedule.id);
		deleteModal = false;
		getEventSchedule();
	}

	let eventSchedules = [];

	async function getEventSchedule() {
		loading = true;
		const { data } = await getEventSchedules();
		eventSchedules = data;
		loading = false;
	}

	// $: {
	// 	if ($page.params.batchId) {
	// 		getEventSchedule();
	// 	}

	// }

	onMount(getEventSchedule);
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Event Schedule" description="" {headers} rows={eventSchedules}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ trainer_name: null, batch_name: null })}
					>Add Schedule</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
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
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:eventSchedule on:update-list={getEventSchedule} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
