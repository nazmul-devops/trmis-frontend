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
		{ key: 'name', value: 'Name' },
		{ key: 'designation', value: 'Designation' },
		{ key: 'district', value: 'District' },
		{ key: 'email', value: 'Email' },
		{ key: 'gender', value: 'Gender' },
		{ key: 'organization', value: 'Organization' },
		{ key: 'status', value: 'Status' },
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
		title="Pendin Trainee Request"
		description=""
		{headers}
		rows={$traineeRequests.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
				</OverflowMenu>
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:traineeRequest />
