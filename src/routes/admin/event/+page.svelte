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
	let event;

	function openModalForm(row) {
		event = row;
		open = true;
	}

	async function doDelete() {
		await deleteEvent(event.id);
		deleteModal = false;
		getEvent();
	}

	let events = [];

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
				<Button on:click={() => openModalForm({})}>Add Event</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							event = { ...row };
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

<FormModal bind:open bind:event on:update-list={getEvent} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
