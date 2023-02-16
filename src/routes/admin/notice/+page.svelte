<script lang="ts">
	import { deleteNotice, getNotices } from '$lib/service/notice';
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
		OverflowMenuItem,
		Toggle
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { CellTower } from 'carbon-icons-svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'title', value: 'Tilte' },
		{ key: 'description', value: 'Description' },
		{ key: 'files', value: 'Notice File' },
		{ key: 'show_in_home_page', value: 'Status' },
		// { key: 'expiration_date', value: 'Exp Date' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let Notices: any = [];

	let notice;

	function openModalForm(row) {
		open = true;
		notice = row;
	}

	async function doDelete() {
		await deleteNotice(notice.id);
		deleteModal = false;
		getNoticeList();
	}

	async function getNoticeList() {
		const { data } = await getNotices();
		Notices = data;
	}

	onMount(async () => {
		getNoticeList();
	});
</script>

{#if Notices.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Notice" description="" {headers} rows={Notices}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Notice</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
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
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:notice on:update-list={getNoticeList} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
