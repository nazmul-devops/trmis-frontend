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
		{ key: 'duration', value: 'Duration' },
		{ key: 'coordinator', value: 'Training Coordinators' },
		{ key: 'organization', value: 'Organizations' },
		{ key: 'source_of_fund', value: 'Sources Of Fund' },
		{ key: 'training_center', value: 'Training Schedules' },
		{ key: 'status_name', value: 'Status' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let bulkUpModal = false;
	let batch;

	function openModalForm(row) {
		open = true;
		batch = row;
	}

	function openBulkForm() {
		bulkUpModal = true;
	}

	async function doDelete() {
		await batchs.deleteBatch(batch.id);
		deleteModal = false;
	}

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
				<OverflowMenu flipped direction="top" size="sm">
					<OverflowMenuItem
						on:click={() => goto(`/adminbatch/${row.id}/upload-excel/`)}
						text="Bulk Upload"
					/>
					<OverflowMenuItem
						on:click={() => goto(`/admin/training/batch/${row.id}/participants`)}
						text="Participants"
					/>
					<OverflowMenuItem
						on:click={() => goto(`/admin/training/batch/${row.id}/resources`)}
						text="Resources"
					/>
					<OverflowMenuItem
						on:click={() => goto(`/admin/training/batch/${row.id}/session-details`)}
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
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'batch'} />
