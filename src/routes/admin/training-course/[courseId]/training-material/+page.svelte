<script lang="ts">
	import { courseMaterials } from '$lib/store/courseMaterial';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ToolbarMenu,
		ToolbarMenuItem,
		Button,
		DataTableSkeleton,
		OverflowMenu,
		OverflowMenuItem,
		Row
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';
	import FormModal from './FormModal.svelte';
	import DeleteModal from '$lib/DeleteModal.svelte';
	import { page } from '$app/stores';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'title', value: 'Title' },
		{ key: 'description', value: 'Description' },
		{ key: 'files', value: 'File' },
		{ key: 'training_course_name', value: 'Course Name' },
		{ key: 'action', value: 'Action' }
	];

	let open = false;
	let deleteModal = false;

	let courseMaterial;

	function openModalForm(row) {
		open = true;
		courseMaterial = row;
	}

	async function doDelete() {
		await courseMaterials.deleteCourseMaterial(courseMaterial.id);
		deleteModal = false;
	}

	onMount(async () => {
		courseMaterials.getCourseMaterials($page.params.courseId);
	});

</script>

{#if $courseMaterials.loading}
	<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
{:else}
	<DataTable
		size="short"
		title="Training Materials"
		description=""
		{headers}
		rows={$courseMaterials.data}
	>
		<Toolbar size="sm">
			<ToolbarContent>
				<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				<Button on:click={() => openModalForm({ name: null, id: null })}>Add Material</Button>
			</ToolbarContent>
		</Toolbar>
		<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
			{#if cell.key === 'action'}
				<OverflowMenu flipped>
					<!-- <OverflowMenuItem text="View" /> -->
					<OverflowMenuItem on:click={() => openModalForm(row)} text="Edit" />
					<OverflowMenuItem
						on:click={() => {
							courseMaterial = { ...row };
							deleteModal = true;
						}}
						danger
						text="Delete"
					/>
				</OverflowMenu>
				<!-- {:else if cell.key === 'files'} -->

				<!-- {#each cell.value as item}
					<ul>
						<li>{item}</li>
					</ul>
				{/each} -->
			{:else if cell.key === 'rowNumber'}
				{rowIndex + 1}
			{:else}{cell.value}{/if}
		</svelte:fragment>
	</DataTable>
{/if}

<FormModal bind:open bind:courseMaterial />
<DeleteModal bind:open={deleteModal} on:deleteConfirm={doDelete} name={'Training Material'} />
