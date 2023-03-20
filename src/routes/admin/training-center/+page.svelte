<script lang="ts">
	import { trainingCenters } from '$lib/store/trainingCenter';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
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
		{ key: 'rowNumber', value: '#'},
		{ key: 'name', value: 'Name' },
		{ key: 'division_name', value: 'Division' },
		{ key: 'district_name', value: 'Zilla' },
		{ key: 'sub_district_name', value: 'Upazilla' },
		{ key: 'address', value: 'Address' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let trainingCenter;

	function openModalForm(row) {
		open = true;
		trainingCenter = row;
	}

	async function doDelete() {
		await trainingCenters.deleteTrainingCenter(trainingCenter.id);
		deleteModal = false;
	}

	onMount(async () => {
		trainingCenters.getTrainingCenters();
	});
</script>

{#if $trainingCenters.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Training Venue"
		description=""
		{headers}
		rows={$trainingCenters.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Training Venue</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<!-- <OverflowMenuItem text="View" /> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							trainingCenter = { ...row };
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

<FormModal bind:open bind:trainingCenter />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={"Training Venue"} />
