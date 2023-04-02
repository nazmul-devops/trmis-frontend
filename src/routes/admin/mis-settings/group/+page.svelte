<script lang="ts">
	import { groupsList } from '$lib/store/group';
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

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.'},
		// { key: 'id', value: 'ID' },
		{ key: 'name', value: 'Name' },
		// { key: 'permissions', value: 'Permission' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let group;

	function openModalForm(row) {
		open = true;
		group = row;
		console.log(row);
	}

	async function doDelete() {
		await groupsList.deleteGroup(group.id);
		deleteModal = false;
	}

	onMount(async () => {
		groupsList.getGroups();
	});

	$: {
		console.log($groupsList.data);
	}
</script>

{#if $groupsList.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Course Group" description="" {headers} rows={$groupsList.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({})}>Add Group</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							group = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'permissions'}
				{#each cell.value as item}
					<ul>
						<li>=> {item.permission_name}</li>
					</ul>
				{/each}
			{:else if cell.key === 'rowNumber'}
					{ rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:group />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'group'} />
