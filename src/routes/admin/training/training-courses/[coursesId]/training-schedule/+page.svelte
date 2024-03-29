<script lang="ts">
	import { trainingSchedules } from '$lib/store/trainingSchedule';
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
	import { goto } from '$app/navigation';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'training_course_name', value: 'Training Course' },
		{ key: 'training_center_name', value: 'Training Venues' },
		{ key: 'start_date', value: 'Start Date' },
		{ key: 'end_date', value: 'End Date' },
		{ key: 'status_name', value: 'Status' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let schedule;

	function openModalForm(row) {
		open = true;
		schedule = row;
	}

	async function doDelete() {
		await trainingSchedules.deleteTrainingSchedule(schedule.id);
		deleteModal = false;
	}

	onMount(async () => {
		trainingSchedules.getTrainingSchedules();
	});
</script>

{#if $trainingSchedules.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Training Schedule"
		description=""
		{headers}
		rows={$trainingSchedules.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Schedule</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							schedule = { ...row };
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

<FormModal bind:open bind:schedule />
<DeleteModal
	textContent={'If you delete this training-schedule, any corresponding batches will also be deleted if they are associated with this training-schedule.'}
	bind:open={deleteModal}
	on:deleteConfirm={doDelete}
	name={'Training Schedule'}
/>
