<script lang="ts">
	import { trainers } from '$lib/store/trainer';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		Button,
		DataTableSkeleton,
		Loading,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';

	let filteredRowIds = [];
	let headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'organization', value: 'Organization' },
		{ key: 'gender', value: 'Gender' },
		{ key: 'nid', value: 'NID' },
		{ key: 'phone', value: 'Phone' },
		{ key: 'address', value: 'Address' },
		{ key: 'dob', value: 'Dob' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let trainer;

	function openModalForm(row) {
		open = true;
		trainer = row;
	}

	async function doDelete() {
		await trainers.deleteTrainer(trainer.phone);
		deleteModal = false;
	}

	onMount(async () => {
		trainers.getTrainers();
		designations.getDesignations();
		organizations.getOrganizations();
	});
</script>

{#if $trainers.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Trainer" description="" {headers} rows={$trainers.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Trainer</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="View" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							trainer = { ...row };
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

<FormModal bind:open bind:trainer />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} />
