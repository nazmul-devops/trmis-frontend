<script lang="ts">
	import { trainees } from '$lib/store/trainee';
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
	import BulkUploadForm from './BulkUploadForm.svelte';
	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'name', value: 'Name' },
		{ key: 'designation_name', value: 'Designations' },
		{ key: 'organization_name', value: 'Organizations' },
		{ key: 'gender_name', value: 'Gender' },
		{ key: 'phone', value: 'Mobile' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let bulkUpModal = false;
	let trainee;

	function openModalForm(row) {
		open = true;
		trainee = row;
	}

	function openBulkForm() {
		bulkUpModal = true;
	}

	async function doDelete() {
		await trainees.deleteTrainee(trainee.id);
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
	<DataTable size="short" title="Participants" description="" {headers} rows={$trainees.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button class="t-mr-2" on:click={() => openModalForm({ name: null, nid: null })}
					>Add Participants</Button
				>
				<Button on:click={() => openBulkForm()}>Bulk Upload</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem
						on:click={() => goto(`/admin/training/trainee/${row.id}/completed-course`)}
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
			{:else if cell.key === 'rowNumber'}
				{rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:trainee />
<BulkUploadForm bind:open={bulkUpModal} />
<DeleteModal
	textContent={'If you delete this participant, any corresponding batch participant will also be deleted if they are associated with this participant.'}
	bind:open={deleteModal}
	on:deleteConfirm={doDelete}
	name={'participants'}
/>
