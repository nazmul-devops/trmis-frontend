<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem,
		Row
	} from 'carbon-components-svelte';

	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { deleteEvent, getEvents } from '$lib/service/event';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'name', value: 'Event Name' },
		{ key: 'coordinator_name', value: 'Event Coordinators' },
		{ key: 'organization_name', value: 'Organizations' },
		{ key: 'status_name', value: 'Status' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let event;

	async function doDelete() {
		await deleteEvent(event.id);
		deleteModal = false;
		getEvent();
	}

	let events: Array<any> = [];

	async function getEvent() {
		loading = true;
		const { data } = await getEvents();
		events = data;
		loading = false;
	}

	onMount(getEvent);
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Event" description="" {headers} rows={events}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => goto(`/admin/event/event-list/add-event`)}>Add Event</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => goto(`/admin/event/event-list/${row.id}/edit`)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							event = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{ rowIndex + 1 }
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:event on:update-list={getEvent} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'event'} />
