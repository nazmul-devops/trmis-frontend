<script lang="ts">
	import { users } from '$lib/store/users';
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

	let headers = [
		{ key: 'id', value: 'ID' },
		{ key: 'username', value: 'Email' },
		{ key: 'first_name', value: 'FirstName' },
		{ key: 'last_name', value: 'LasttName' },
		{ key: 'email', value: 'Email' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let user;

	function openModalForm(row) {
		open = true;
		user = row;
	}

	async function doDelete() {
		await users.deleteUser(user.id);
		deleteModal = false;
	}

	onMount(async () => {
		users.getUsers();
		// console.log($users);
	});
</script>

{#if $users.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Degrees" description="" {headers} rows={$users.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch />
				<ToolbarMenu>
					<ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
					<ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service"
						>API documentation</ToolbarMenuItem
					>
					<ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
				</ToolbarMenu>
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add trainer</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							user = { ...row };
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

<FormModal bind:user bind:open />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
