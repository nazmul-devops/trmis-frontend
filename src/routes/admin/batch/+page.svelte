<script lang="ts">
	import { getBatches, deleteBatch } from '$lib/service/batch';
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

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { goto } from '$app/navigation';
	let filteredRowIds = [];
	let headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'duration', value: 'Duration' },
		{ key: 'initial_cost', value: 'Initial Cost' },
		{ key: 'final_cost', value: 'Final Cost' },
		{ key: 'coordinator', value: 'Coordinator' },
		{ key: 'organization', value: 'Organization' },
		{ key: 'source_of_fund', value: 'Source Of Fund' },
		{ key: 'training_center', value: 'Training Schedule' },
		{ key: 'status', value: 'Status' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let batch;

	function openModalForm(row) {
		batch = row;
		open = true;
		console.log(row);
	}

	async function doDelete() {
		await deleteBatch(batch.id);
		deleteModal = false;
		batchList();
	}

	let batches = [];

	async function batchList() {
		loading = true;
		const { data } = await getBatches();
		batches = data;
		loading = false;
	}

	onMount(async () => {
		batchList();
	});
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Batches" description="" {headers} rows={batches}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Batch</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={() => goto(`/admin/batch/${row.id}/participants`)}
						text="Participants"
					/>
					<OverflowMenuItem
						on:click={() => goto(`/admin/batch/${row.id}/resources`)}
						text="Resources"
					/>
					<OverflowMenuItem
						on:click={() => goto(`/admin/batch/${row.id}/session-details`)}
						text="Session Details"
					/>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							batch = { ...row };
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

<FormModal bind:open bind:batch on:update-list={batchList} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
