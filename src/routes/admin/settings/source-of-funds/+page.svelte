<script lang="ts">
	import { sourceOfFounds } from '$lib/store/source-of-found';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		DataTableSkeleton,
		Loading,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'name', value: 'Name' },
		// { key: 'serial_no', value: 'Serial No' },
		// { key: 'remarks', value: 'Remarks' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let sourceOfFound;

	function openModalForm(row) {
		open = true;
		sourceOfFound = row;
	}

	async function doDelete() {
		await sourceOfFounds.deleteSourceOfFund(sourceOfFound.id);
		deleteModal = false;
	}

	onMount(async () => {
		sourceOfFounds.getSourceOfFounds();
	});
</script>

{#if $sourceOfFounds.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Source Of Fund"
		description=""
		{headers}
		rows={$sourceOfFounds.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Source Of fund</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction='top'>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							sourceOfFound = { ...row };
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

<FormModal bind:open bind:sourceOfFound />
<DeleteModal textContent={"If you delete this source-of-fund, any corresponding batches and events will also be deleted if they are associated with this source-of-fund."} bind:open={deleteModal} on:deleteConfirm={doDelete} name={"source of fund"} />
