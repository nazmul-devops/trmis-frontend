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
	import { deleteBatchSession, getBatchSessions } from '$lib/service/batch-sessions-detail';
	import { page } from '$app/stores';
	let filteredRowIds = [];
	let headers = [
		{ key: 'trainer_name', value: 'Participant' },
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let loading = false;
	let deleteModal = false;
	let sessionDetail;

	function openModalForm(row) {
		sessionDetail = row;
		open = true;
	}

	async function doDelete() {
		await deleteBatchSession(parseInt($page.params.batchId), sessionDetail.id);
		deleteModal = false;
		getBatchSession();
	}

	let sessions = [];

	async function getBatchSession() {
		loading = true;
		const { data } = await getBatchSessions($page.params.batchId);
		sessions = data;
		loading = false;
	}

	$: {
		if ($page.params.batchId) {
			getBatchSession();
		}
	}
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="All Participant" description="" {headers} rows={sessions}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ trainer_name: null, batch_name: null })}
					>Add Participant</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={() => {
							sessionDetail = { ...row };
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

<FormModal bind:open on:update-list={getBatchSession} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
