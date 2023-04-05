<script lang="ts">
	import { notices } from '$lib/store/notice';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem,
		Toggle
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'title', value: 'Tilte' },
		// { key: 'description', value: 'Description' },
		{ key: 'files', value: 'Notice File' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;


	let notice;

	function openModalForm(row) {
		open = true;
		notice = row;
	}

	async function doDelete() {
		await notices.deleteNotice(notice.id);
		deleteModal = false;
	}

	onMount(async () => {
		notices.getNotices();
	});
</script>

{#if $notices.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Notice" description="" {headers} rows={$notices.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Notice</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							notice = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'show_in_home_page'}
				<Toggle toggled={cell.value} labelA="Disabled" labelB="Active" disabled />
			{:else if cell.key === 'rowNumber'}
				{ rowIndex + 1 }
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:notice />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'notice'} />
