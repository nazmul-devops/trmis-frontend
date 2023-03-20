<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem,
		Row
	} from 'carbon-components-svelte';

	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { batchParticipantsList } from '$lib/store/batch-participants';
	import { page } from '$app/stores';
	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: '#' },
		{ key: 'trainee_name', value: 'Participant' },
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let participant;

	function openModalForm(row) {
		open = true;
		participant = row;
	}

	async function doDelete() {
		await batchParticipantsList.deleteBatchParticipant(
			parseInt($page.params.batchId),
			participant.id
		);
		deleteModal = false;
		await batchParticipantsList.getBatchParticipants(parseInt($page.params.batchId));
	}

	$: {
		if ($page.params.batchId) {
			batchParticipantsList.getBatchParticipants(parseInt($page.params.batchId));
		}
	}
</script>

{#if $batchParticipantsList.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="All Participant"
		description=""
		{headers}
		rows={$batchParticipantsList.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm(Row)}>Add Participant</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={() => {
							participant = { ...row };
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

<FormModal bind:open bind:participant />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name="participant" />
