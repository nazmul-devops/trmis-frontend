<script lang="ts">
	import { plannedBatches } from '$lib/store/planned';
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

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'year', value: 'Year' },
		{ key: 'no_of_batch', value: 'No Of Batch' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let planned;

	function openModalForm(row) {
		open = true;
		planned = row;
	}

	async function doDelete() {
		await plannedBatches.deletePlannedBatch(planned.id);
		deleteModal = false;
	}

	onMount(async () => {
		plannedBatches.getPlannedBatches();
	});
</script>

{#if $plannedBatches.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Planned Batch"
		description=""
		{headers}
		rows={$plannedBatches.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Planned</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<!-- <OverflowMenuItem text="View" /> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							planned = { ...row };
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

<FormModal bind:open bind:planned />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'designation'} />
