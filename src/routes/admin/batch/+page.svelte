<script lang="ts">
	import { batchs } from '$lib/store/batch';
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
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'name', value: 'Name' },
		{ key: 'duration', value: 'Duration (in Days)' },
		// { key: 'initial_cost', value: 'Budget In Taka' },
		// { key: 'final_cost', value: 'Expenditure In Taka' },
		{ key: 'coordinator', value: 'Coordinator' },
		{ key: 'organization', value: 'Organization' },
		{ key: 'source_of_fund', value: 'Source Of Fund' },
		{ key: 'training_center', value: 'Training Schedule' },
		{ key: 'status_name', value: 'Status' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let batch;

	function openModalForm(row) {
		open = true;
		batch = row;
	}

	async function doDelete() {
		await batchs.deleteBatch(batch.id);
		deleteModal = false;
		// batchList();
	}

	// let batches = [];

	// async function batchList() {
	// 	loading = true;
	// 	const { data } = await getBatches();
	// 	batches = data;
	// 	loading = false;
	// }

	onMount(async () => {
		batchs.getBatches();
		// batchList();
	});
</script>

{#if $batchs.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Batch" description="" {headers} rows={$batchs.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Batch</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
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
			{:else if cell.key === 'rowNumber'}
				{rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:batch />
<DeleteModal  bind:open={deleteModal} on:deleteConfirm={doDelete} name={'batch'} />
