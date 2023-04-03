<script lang="ts">
	import { users } from '$lib/store/users';
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
	import CreateFormModal from './CreateFormModal.svelte';
	import EditFormModal from './EditFormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';

	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'username', value: 'Username' },
		{ key: 'first_name', value: 'FirstName' },
		{ key: 'last_name', value: 'LastName' },
		{ key: 'email', value: 'Email' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let editModal = false;

	let user;

	function openCreateModalForm() {
		open = true;
	}

	function openEditModalForm(row) {
		editModal = true;
		user = row;
	}

	async function doDelete() {
		await users.deleteUser(user.id);
		deleteModal = false;
	}

	onMount(async () => {
		users.getUsers();
		console.log($users);
	});
</script>

{#if $users.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Users" description="" {headers} rows={$users.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch />
				<Button on:click={() => openCreateModalForm()}>Add User</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction='top'>
					<OverflowMenuItem on:click={() => openEditModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							user = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{ rowIndex + 1 }
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<CreateFormModal bind:open />
<EditFormModal bind:user bind:open={editModal} />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'user'} />
