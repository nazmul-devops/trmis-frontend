<script lang="ts">
	import { collaborations } from '$lib/store/collaboration';
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
		{ key: 'remarks', value: 'Remarks' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let collaboration;

	function openModalForm(row) {
		open = true;
		collaboration = row;
	}

	async function doDelete() {
		await collaborations.deleteCollaboration(collaboration.id);
		deleteModal = false;
	}

	onMount(async () => {
		collaborations.getCollaborations();
	});
</script>

{#if $collaborations.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Collaboration"
		description=""
		{headers}
		rows={$collaborations.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Collaboration</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							collaboration = { ...row };
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

<FormModal bind:open bind:collaboration />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
