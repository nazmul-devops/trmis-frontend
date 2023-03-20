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
	import { deleteBatchResource, getBatchResources } from '$lib/service/batch-resources';
	import { page } from '$app/stores';
	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: '#' },
		{ key: 'trainer_name', value: 'Participant' },
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let resource;

	function openModalForm(row) {
		open = true;
	}

	async function doDelete() {
		await deleteBatchResource(parseInt($page.params.batchId), resource.id);
		deleteModal = false;
		getBatchResource();
	}

	let participants = [];

	async function getBatchResource() {
		loading = true;
		const { data } = await getBatchResources($page.params.batchId);
		participants = data;
		loading = false;
	}

	$: {
		if ($page.params.batchId) {
			getBatchResource();
		}
	}
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Resource Person" description="" {headers} rows={participants}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ trainer_name: null, batch_name: null })}
					>Add Resource</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={() => {
							resource = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{ rowIndex  + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open on:update-list={getBatchResource} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name="resouce person"/>
