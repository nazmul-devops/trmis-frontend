<script lang="ts">
	import { getContacts, deleteContact } from '$lib/service/contact';
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
	import DeleteModal from '$lib/DeleteModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'name', value: 'Name' },
		{ key: 'remarks', value: 'Remarks' },
		{ key: 'action', value: 'Action' }
	];

	// let open = false;
	let deleteModal = false;

	let contact;

	async function doDelete() {
		await deleteContact(contact.id);
		deleteModal = false;
	}

	onMount(async () => {
		await getContacts();
		console.log(getContacts());
	});
</script>

<!-- {#if $collaborations.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else} -->
<DataTable size="short" title="Collaboration" description="" {headers} rows={{getContacts.data}}>
	<Toolbar size="sm">
		<ToolbarContent>
			<ToolbarSearch shouldFilterRows bind:filteredRowIds />
		</ToolbarContent>
	</Toolbar>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === 'action'}
			<OverflowMenu flipped>
				<OverflowMenuItem
					on:click={() => {
						contact = { ...row };
						deleteModal = true;
					}}
					danger
					text="Delete"
				/>
			</OverflowMenu>
		{:else}{cell.value}{/if}
	</svelte:fragment>
</DataTable>
<!-- {/if} -->

<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
