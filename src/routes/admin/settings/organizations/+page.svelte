<script lang="ts">
	import { organizations } from '$lib/store/organization';
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

	let organization;

	function openModalForm(row) {
		open = true;
		organization = row;
	}

	async function doDelete() {
		await organizations.deleteOrganization(organization.id);
		deleteModal = false;
	}

	onMount(async () => {
		organizations.getOrganizations();
	});
</script>

{#if $organizations.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Organization" description="" {headers} rows={$organizations.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Organization</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							organization = { ...row };
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

<FormModal bind:open bind:organization />
<DeleteModal
	textContent={'If you delete this organization, any corresponding Batch, Participant, Resource Person and events will also be deleted if they were associated with this organization.'}
	bind:open={deleteModal}
	on:deleteConfirm={doDelete}
	name={'organization'}
/>
