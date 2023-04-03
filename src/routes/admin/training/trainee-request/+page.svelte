<script lang="ts">
	import { traineeRequests } from '$lib/store/trainee-request';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'name', value: 'Name' },
		{ key: 'designation_name', value: 'Designations' },
		{ key: 'district_name', value: 'Zilla' },
		{ key: 'email', value: 'Email' },
		{ key: 'organization_name', value: 'Organizations' },
		{ key: 'status_name', value: 'Status' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let traineeRequest;

	function openModalForm(row) {
		open = true;
		traineeRequest = row;
	}

	onMount(async () => {
		traineeRequests.getTrainee_Requests();
	});
</script>

{#if $traineeRequests.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Pending Trainee Request"
		description=""
		{headers}
		rows={$traineeRequests.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped direction="top">
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
				</OverflowMenu>
			{:else if cell.key === 'rowNumber'}
				{rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:traineeRequest />
