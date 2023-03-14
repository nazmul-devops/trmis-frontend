<script lang="ts">
	import { trainers } from '$lib/store/trainer';
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
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { goto } from '$app/navigation';

	let filteredRowIds = [];
	let headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'organization__name', value: 'Organization' },
		{ key: 'gender_name', value: 'Gender' },
		{ key: 'phone', value: 'Phone' },
		{ key: 'division_name', value: 'Division' },
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
		await trainers.deleteTrainer(trainer.id);
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
	<DataTable
		size="short"
		title="Resource Person / Facilitator"
		description=""
		{headers}
		rows={$trainers.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Resources</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<!-- <OverflowMenuItem
						on:click={() => goto(`/admin/trainer/${row.phone}/education`)}
						text="Education"
					/> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							console.log(row);
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
<DeleteModal
	bind:open={deleteModal}
	on:deleteConfirm={doDelete}
	name={'Resource Person / Facilitator'}
/>
