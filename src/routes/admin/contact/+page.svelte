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
		{ key: 'first_name', value: 'First Name' },
		{ key: 'last_name', value: 'Last Name' },
		{ key: 'email', value: 'Email' },
		{ key: 'phone', value: 'Phone' },
		{ key: 'company_name', value: 'Company Name' },
		{ key: 'message', value: 'Message' },
		{ key: 'action', value: 'Action' }
	];

	let messages: any = [];
	let loading = true;

	let deleteModal = false;

	let contact;

	async function doDelete() {
		loading = true;
		await deleteContact(contact.id);
		messages = (await getContacts()).data;
		deleteModal = false;
		loading = false;
	}

	onMount(async () => {
		const { data } = await getContacts();
		messages = data;
		loading = false;
	});
</script>

{#if loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Messages" description="" {headers} rows={messages}>
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
{/if}

<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
