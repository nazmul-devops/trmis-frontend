<script lang="ts">
	import { goto } from '$app/navigation';
	import { courseCategories } from '$lib/store/courseCategory';
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		DataTableSkeleton
	} from 'carbon-components-svelte';

	import { onMount } from 'svelte';

	let filteredRowIds = [];
	let headers = [
		{ key: 'rowNumber', value: 'Serial No.' },
		{ key: 'title', value: 'Title' }
	];

	function rowClickHandler(row) {
		goto(`/admin/training/training-courses/${row.detail.id}/training-course`);
	}

	onMount(async () => {
		courseCategories.getCourseCategories();
	});
</script>

<div class=" categoryDatatable ">
	{#if $courseCategories.loading}
		<DataTableSkeleton showHeader={false} showToolbar={false} {headers} />
	{:else}
		<DataTable
			size="short"
			title="Training Category"
			description=""
			{headers}
			rows={$courseCategories.data}
			on:click:row={rowClickHandler}
		>
			<Toolbar size="sm">
				<ToolbarContent>
					<ToolbarSearch shouldFilterRows bind:filteredRowIds />
				</ToolbarContent>
			</Toolbar>
			<svelte:fragment slot="cell" let:cell let:row let:rowIndex>
				{#if cell.key === 'rowNumber'}
					{rowIndex + 1}
				{:else}{cell.value}{/if}
			</svelte:fragment>
		</DataTable>
	{/if}
</div>
