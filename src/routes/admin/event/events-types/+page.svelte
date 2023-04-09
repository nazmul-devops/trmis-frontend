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
	import { deleteEventType, getEventTypes } from '$lib/service/event-type';
	import { onMount } from 'svelte';
	let filteredRowIds = [];
	let headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let eventType;

	function openModalForm(row) {
		eventType = row;
		open = true;
	}

	async function doDelete() {
		await deleteEventType(eventType.id);
		deleteModal = false;
		getEventType();
	}

	let eventTypes = [];

	async function getEventType() {
		loading = true;
		const { data } = await getEventTypes();
		eventTypes = data;
		loading = false;
	}

	onMount(getEventType);
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Event Type" description="" {headers} rows={eventTypes}>
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
							eventType = { ...row };
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

<FormModal bind:open bind:eventType on:update-list={getEventType} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
