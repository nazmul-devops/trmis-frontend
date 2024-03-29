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
	import { Roadmap } from 'carbon-icons-svelte';
	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'batch_name', value: 'Batch' },
		{ key: 'session_day', value: 'Day' },
		{ key: 'topic', value: 'Topic' },
		{ key: 'trainer_name', value: 'Resources Person' },
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
	<DataTable size="short" title="All Session Details" description="" {headers} rows={sessions}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ trainer_name: null, batch_name: null })}
					>Add Session</Button
				>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							sessionDetail = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{ rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:sessionDetail on:update-list={getBatchSession} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'session-detail'}/>
