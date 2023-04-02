<script lang="ts">
	import { educations } from '$lib/store/traineeEducation';
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
	import { page } from '$app/stores';

	let filteredRowIds = [];
	let headers = [
		{ key: 'trainee', value: 'Trainee' },
		{ key: 'degree', value: 'Degree' },
		{ key: 'board', value: 'Board' },
		{ key: 'institution', value: 'Institution' },
		{ key: 'result', value: 'Result' },
		{ key: 'passing_year', value: 'Passing Year' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;
	let education;

	function openModalForm(row) {
		open = true;
		education = row;
	}

	async function doDelete() {
		await educations.deleteEducation(education.id);
		deleteModal = false;
	}

	onMount(async () => {
		educations.getEducations();
	});
</script>

{#if $educations.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Trainee Education"
		description=""
		{headers}
		rows={$educations.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, nid: null })}>Add Education</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<OverflowMenuItem text="Completed Course" />
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							education = { ...row };
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

<FormModal bind:open bind:education />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name="trainee education"/>
