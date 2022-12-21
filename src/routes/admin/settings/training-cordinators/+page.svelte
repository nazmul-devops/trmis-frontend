<script lang="ts">
	import { cordinators } from '$lib/store/trainingCordinators';
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

	let cordinator;

	function openModalForm(row) {
		open = true;
		cordinator = row;
	}

	async function doDelete() {
		await cordinators.deleteCordinator(cordinator.id);
		deleteModal = false;
	}

	onMount(async () => {
		cordinators.getCordinators();
		console.log($cordinators);
	});
</script>

{#if $cordinators.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Degrees" description="" {headers} rows={$cordinators.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch />
				<ToolbarMenu>
					<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
					<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service"
						>API documentation</ToolbarMenuItem
					>
					<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
				</ToolbarMenu>
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add trainer</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							cordinator = { ...row };
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

<FormModal bind:open bind:cordinator />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
