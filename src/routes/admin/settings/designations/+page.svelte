<script lang="ts">
	import { designations } from '$lib/store/designations';
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
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let designation;

	function openModalForm(row) {
		open = true;
		designation = row;
	}

	async function doDelete() {
		await designations.deleteDesignation(designation.id);
		deleteModal = false;
	}

	onMount(async () => {
		designations.getDesignations();
	});
</script>

{#if $designations.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Designations" description="" {headers} rows={$designations.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Designation</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							designation = { ...row };
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

<FormModal bind:open bind:designation />
<DeleteModal
	textContent={'If you delete this designation, any corresponding Participant and Resource Person will also be deleted if they are associated with this designation.'}
	bind:open={deleteModal}
	on:deleteConfirm={doDelete}
	name={'designation'}
/>
