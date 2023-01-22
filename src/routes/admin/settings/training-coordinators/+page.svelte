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
		{ key: 'id', value: 'ID' },
		{ key: 'name', value: 'Name' },
		{ key: 'code', value: 'Code' },
		{ key: 'phone', value: 'Phone' },
		{ key: 'alt_phone', value: 'Alt Phone' },
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
	<DataTable size="short" title="Training Coordinator" description="" {headers} rows={$coordinators.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<ToolbarMenu>
					<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
					<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service"
						>API documentation</ToolbarMenuItem
					>
					<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
				</ToolbarMenu>
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Coordinator</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
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
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:coordinator />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
