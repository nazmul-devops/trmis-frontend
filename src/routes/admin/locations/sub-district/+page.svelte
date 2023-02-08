<script lang="ts">
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
	import { districts } from '$lib/store/district';
	import { subDistricts } from '$lib/store/sub-district';

	let filteredRowIds = [];
	let headers = [
		// { key: 'id', value: 'ID' },
		{ key: 'name', value: 'Name' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let subDistrict;

	function openModalForm(row) {
		open = true;
		subDistrict = row;
	}

	async function doDelete() {
		await subDistricts.deleteSubDistrict(subDistrict.id);
		deleteModal = false;
	}

	onMount(async () => {
		subDistricts.getSubDistricts();
	});
</script>

{#if $subDistricts.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Sub-district" description="" {headers} rows={$subDistricts.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Sub-district</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							subDistrict = { ...row };
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

<FormModal bind:open bind:subDistrict />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
