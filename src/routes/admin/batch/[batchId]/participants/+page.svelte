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
	import { goto } from '$app/navigation';
	import { deleteBatchParticipant, getBatchParticipants } from '$lib/service/batch-participants';
	import { page } from '$app/stores';
	let filteredRowIds = [];
	let headers = [
		{ key: 'trainee_name', value: 'Participant' },
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let participant;

	function openModalForm(row) {
		participant = row;
		open = true;
		console.log('error');
	}

	async function doDelete() {
		await deleteBatchParticipant(parseInt($page.params.batchId), participant.id);
		deleteModal = false;
		getBatchParticapnts();
	}

	let participants = [];

	async function getBatchParticapnts() {
		const { data } = await getBatchParticipants($page.params.batchId);
		participants = data;
	}

	$: {
		if ($page.params.batchId) {
			loading = true;
			getBatchParticapnts();
			loading = false;
		}
	}
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Participant" description="" {headers} rows={participants}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ trainee_name: null, batch_name: null })}
					>Add Participant</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={() => goto(`/admin/batch/${row.id}/participants`)}
						text="Participants"
					/>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							participant = { ...row };
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

<FormModal bind:open bind:participant on:update-list={getBatchParticapnts} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
