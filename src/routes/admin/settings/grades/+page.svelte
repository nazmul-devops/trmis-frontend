<script lang="ts">
	import { grades } from '$lib/store/grades';
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

	let filteredRowIds = [];
	let headers = [
		{ key: 'serial_no', value: 'Serial No' },
		{ key: 'name', value: 'Name' },
		{ key: 'remarks', value: 'Remarks' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let grade;

	function openModalForm(row) {
		open = true;
		grade = row;
	}

	async function doDelete() {
		await grades.deleteGrade(grade.id);
		deleteModal = false;
	}

	onMount(async () => {
		grades.getGrades();
	});
</script>

{#if $grades.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable size="short" title="Grades" description="" {headers} rows={$grades.data}>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add grade</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<!-- <OverflowMenuItem text="View" /> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							grade = { ...row };
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

<FormModal bind:open bind:grade />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'designation'} />
