<script lang="ts">
	import { coordinators } from '$lib/store/coordinators';
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
		{ key: 'phone', value: 'Phone' },
		{ key: 'email', value: 'Email' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let coordinator;

	function openModalForm(row) {
		open = true;
		coordinator = row;
	}

	async function doDelete() {
		await coordinators.deleteCoordinator(coordinator.id);
		deleteModal = false;
	}

	onMount(async () => {
		coordinators.getCoordinators();
		console.log($coordinators);
	});
</script>

{#if $coordinators.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Training Coordinator"
		description=""
		{headers}
		rows={$coordinators.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Coordinator</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							coordinator = { ...row };
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

<FormModal bind:open bind:coordinator />
<DeleteModal
	bind:open={deleteModal}
	textContent={'If you delete this coordinator, any corresponding batches and events will also be deleted if they are associated with this coordinator.'}
	on:deleteConfirm={doDelete}
	name={'coordinator'}
/>
