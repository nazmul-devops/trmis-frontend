<script lang="ts">
	import { trainees } from '$lib/store/trainee';
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
	import { designations } from '$lib/store/designations';
	import { organizations } from '$lib/store/organization';
	import { goto } from '$app/navigation';
	let filteredRowIds = [];
	let headers = [
		{ key: 'name', value: 'Name' },
		{ key: 'designation_name', value: 'Designation' },
		{ key: 'organization_name', value: 'Organization' },
		{ key: 'gender_name', value: 'Gender' },
		{ key: 'phone', value: 'Mobile' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let trainee;

	function openModalForm(row) {
		open = true;
		trainee = row;
	}

	async function doDelete() {
		await trainees.deleteTrainee(trainee.phone);
		deleteModal = false;
	}

	onMount(async () => {
		trainees.getTrainees();
		designations.getDesignations();
		organizations.getOrganizations();
	});
</script>

{#if $trainees.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Participants" description="" {headers} rows={$trainees.data} zebra>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Participants</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem
						on:click={() => goto(`/admin/trainee/${row.phone}/completed-course`)}
						text="Completed Training"
					/>
					<!-- <OverflowMenuItem
						on:click={() => goto(`/admin/trainee/${row.phone}/education`)}
						text="Education"
					/> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							trainee = { ...row };
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

<FormModal bind:open bind:trainee />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'participants'} />

